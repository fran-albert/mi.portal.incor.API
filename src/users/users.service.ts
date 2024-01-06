import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcryptjs from 'bcryptjs';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UserActiveInterface } from '../common/interface/user-active.interface';
import { Role } from 'src/common/enums/role.enum';
import { v4 as uuidv4 } from 'uuid';
import { UploadService } from 'src/upload/upload.service';
import { CitiesService } from 'src/cities/cities.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly citiesService: CitiesService,
    private uploadService: UploadService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    await this.findOneByEmail(createUserDto.email);

    const city = await this.citiesService.findOne(Number(createUserDto.idCity));

    const newUser = {
      ...createUserDto,
      password: await this.hashPassword(createUserDto.dni),
      city,
      role: createUserDto.role,
    };

    return await this.userRepository.save(newUser);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async getPatients() {
    const patients = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.city', 'city')
      .where('user.role LIKE :roles', { roles: `%${Role.PACIENTE}%` })
      .orderBy('user.lastname', 'ASC')
      .getMany();
    return patients;
  }

  async getDoctors() {
    const doctors = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.city', 'city')
      .where('user.role LIKE :roles', { roles: `%${Role.MEDICO}%` })
      .orderBy('user.lastname', 'ASC')
      .getMany();
    return doctors;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });

    if (user) {
      throw new BadRequestException('El correo electrónico ya está en uso.');
    }

    return user;
  }

  async findUserByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });

    return user;
  }

  async findByEmailWithPassword(email: string) {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'password', 'role'],
    });
  }

  async findOneByResetPasswordToken(resetPasswordToken: string) {
    const user = await this.userRepository.findOneBy({
      resetPasswordToken,
    });

    if (!user) {
      throw new BadRequestException('Token inválido');
    }

    return user;
  }

  async findByIdWithPassword(id: number) {
    return this.userRepository.findOne({
      where: { id },
      select: ['id', 'email', 'password'],
    });
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    file: Express.Multer.File,
  ) {
    const user = await this.findOne(id);

    let uniqueFileName;
    if (file) {
      await this.validateFile(file);
      uniqueFileName = this.generateFileName();
      const fileNameWithExtension = `${uniqueFileName}`;
      const mimeType = 'image/jpeg';

      await this.uploadService.uploadFile(
        file.buffer,
        'storage/avatar',
        fileNameWithExtension,
        mimeType,
      );
    }

    const updateData = {
      ...updateUserDto,
      city: { id: Number(updateUserDto.idCity) },
      photo: file ? uniqueFileName : undefined,
    };
    delete updateData.idCity;

    const updateResult = await this.userRepository.update(id, updateData);

    if (updateResult.affected === 0) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    return {
      ...user,
      ...updateUserDto,
      photo: file ? uniqueFileName : user.photo,
    };
  }

  async updatePassword(id: number, newPassword: string): Promise<void> {
    const hashedPassword = await this.hashPassword(newPassword);
    await this.userRepository.update(id, {
      password: hashedPassword,
    });
  }

  async updateResetToken(id: number, resetToken: string): Promise<void> {
    await this.userRepository.update(id, {
      resetPasswordToken: resetToken,
    });
  }

  async validateFile(file: Express.Multer.File): Promise<void> {
    if (!file) {
      return;
    }
    const allowedMimeTypes = ['image/jpeg', 'image/png'];

    if (!file || !allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        'El archivo debe ser una imagen (JPG o PNG)',
      );
    }
  }

  generateFileName(): string {
    const uniqueFileName = uuidv4();
    return `${uniqueFileName}`;
  }

  async changePassword(
    id: number,
    user: UserActiveInterface,
    changePasswordDto: ChangePasswordDto,
  ) {
    await this.findOne(id);
    const userWithPassword = await this.findByEmailWithPassword(user.email);

    await this.isMatchPassword(
      changePasswordDto.currentPassword,
      userWithPassword.password,
    );

    if (!changePasswordDto.passwordsMatch()) {
      throw new BadRequestException('Las contraseñas nuevas no coinciden.');
    }

    const hashedPassword = await this.hashPassword(
      changePasswordDto.newPassword,
    );

    userWithPassword.password = hashedPassword;

    return await this.userRepository.save(userWithPassword);
  }

  async hashPassword(password: string) {
    const salt = await bcryptjs.genSalt(10);
    return bcryptjs.hash(password, salt);
  }

  async isMatchPassword(password: string, hashedPassword: string) {
    const isMatch = await bcryptjs.compare(password, hashedPassword);
    if (!isMatch) {
      throw new BadRequestException('Contraseña actual incorrecta');
    }
    return isMatch;
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.userRepository.softDelete({ id });
  }
}
