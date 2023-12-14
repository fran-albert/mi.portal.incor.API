import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from '../common/enums/role.enum';
import { Auth } from './decorators/auth.decorator';
import { UserActiveInterface } from '../common/interface/user-active.interface';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
//   @Auth(Role.ADMINISTRADOR)
  @Post('register')
  register(
    @Body()
    registerDto: RegisterDto,
  ) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(
    @Body()
    loginDto: LoginDto,
  ) {
    return this.authService.login(loginDto);
  }

  @ApiBearerAuth()
  @Get('profile')
  @Auth(Role.PACIENTE)
  getProfile(@ActiveUser() user: UserActiveInterface) {
    return this.authService.getProfile(user);
  }
}
