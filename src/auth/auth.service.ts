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
    const userExists = await this.userService.findOneByEmail(registerDto.email);

    if (userExists) {
      throw new BadRequestException('User already exists');
    }

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
      throw new UnauthorizedException('Email is wrong');
    }

    const isPasswordValid = await bcryptjs.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Password is wrong');
    }

    const payload = { email: user.email, roles: user.role };
    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      email: user.email,
    };
  }

  async getProfile({ email, roles }: { email: string; roles: string }) {
    return await this.userService.findOneByEmail(email);
  }
}
