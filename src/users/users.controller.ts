import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/interface/user-active.interface';
import { ChangePasswordDto } from './dto/change-password.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';
import { FileInterceptor } from '@nestjs/platform-express';

// @Auth(Role.PACIENTE)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Auth(Role.SECRETARIA)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // @Auth(Role.MEDICO, Role.SECRETARIA)
  @Get('/patients')
  async getPatients() {
    return this.usersService.getPatients();
  }

  // @Auth(Role.SECRETARIA)
  @Get('/doctors')
  async getDoctors() {
    return this.usersService.getDoctors();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Body('idCity', ParseIntPipe) idCity: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.usersService.update(id, updateUserDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }

  @Auth(Role.MEDICO, Role.SECRETARIA, Role.PACIENTE)
  @Post('/change-password/:id')
  async changePassword(
    @Param('id') id: number,
    @ActiveUser() user: UserActiveInterface,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.usersService.changePassword(id, user, changePasswordDto);
  }
}
