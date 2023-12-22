import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { Role } from 'src/common/enums/role.enum';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    await this.userService.findOneByEmail(registerDto.email);

    const newPlayer = {
      ...registerDto,
      password: await bcryptjs.hash(registerDto.dni, 10),
      city: { id: registerDto.idCity },
      role: [Role.PACIENTE],
    };

    await this.userService.create(newPlayer);

    return {
      message: 'User created successfully',
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByEmailWithPassword(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('El correo electrónico es incorrecto');
    }

    const isPasswordValid = await bcryptjs.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    const payload = { email: user.email, roles: user.role, id: user.id };
    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      email: user.email,
      id: user.id,
    };
  }

  async getProfile(id: number) {
    return await this.userService.findOne(id);
  }
}
