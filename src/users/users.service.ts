import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcryptjs from 'bcryptjs';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UserActiveInterface } from '../common/interface/user-active.interface';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    await this.findOneByEmail(createUserDto.email);

    const newUser = {
      ...createUserDto,
      password: await this.hashPassword(createUserDto.dni),
      city: { id: createUserDto.idCity },
      role: createUserDto.role,
    };

    return await this.userRepository.save(newUser);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async getPatients() {
    const patients = await this.userRepository.find({
      where: {
        role: Role.PACIENTE,
      },
    });

    return patients;
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
      throw new BadRequestException('User already exists');
    }

    return user;
  }

  async findByEmailWithPassword(email: string) {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'password', 'role'],
    });
  }

  async findByIdWithPassword(id: number) {
    return this.userRepository.findOne({
      where: { id },
      select: ['id', 'email', 'password'],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    return await this.userRepository.update(id, {
      ...updateUserDto,
    });
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
