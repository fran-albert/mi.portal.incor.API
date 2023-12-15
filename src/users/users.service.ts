import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcryptjs from 'bcryptjs';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UserActiveInterface } from 'src/common/interface/user-active.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user;
  }

  async findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
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
    user: UserActiveInterface,
    changePasswordDto: ChangePasswordDto,
  ) {
    // const { currentPassword, newPassword } = changePasswordDto;
    // console.log('Email:', user.email);
    // const userId = await this.findUserIdByEmail(user.email);
    // console.log('userId:', userId);
    // await this.findByEmailWithPassword(user.email);
    // console.log('user:', user);
    // console.log('currentPassword:', currentPassword);
    // // console.log('user.password:', user.password);
    // console.log('newPassword:', newPassword);
    // Verificar que la contraseña actual es correcta
    // const isMatch = await bcryptjs.compare(currentPassword, user.password);
    // if (!isMatch) {
    //   throw new BadRequestException('Contraseña actual incorrecta');
    // }
    // // Encriptar la nueva contraseña
    // const hashedPassword = await bcryptjs.hash(newPassword, 10);
    // // Actualizar la contraseña del usuario
    // user.password = hashedPassword;
    // await this.userRepository.save(user);
    // return { message: 'Contraseña cambiada con éxito' };
  }

  async hashPassword(password: string) {
    const salt = await bcryptjs.genSalt(10);
    return bcryptjs.hash(password, salt);
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.userRepository.softDelete({ id });
  }
}
