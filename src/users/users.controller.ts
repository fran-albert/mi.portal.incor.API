import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/interface/user-active.interface';
import { ChangePasswordDto } from './dto/change-password.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';

@Auth(Role.PACIENTE)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Auth(Role.SECRETARIA)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Auth(Role.MEDICO, Role.SECRETARIA)
  @Get('/patients')
  async getPatients() {
    return this.usersService.getPatients();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }

  @Post('/change-password/:id')
  async changePassword(
    @Param('id') id: number,
    @ActiveUser() user: UserActiveInterface,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.usersService.changePassword(id, user, changePasswordDto);
  }
}
