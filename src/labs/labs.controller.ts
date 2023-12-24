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
import { LabsService } from './labs.service';
import { CreateLabDto } from './dto/create-lab.dto';
import { UpdateLabDto } from './dto/update-lab.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { LabResponseDto } from './dto/response-lab.dto';

@Controller('labs')
export class LabsController {
  constructor(private readonly labsService: LabsService) {}

  // @Auth(Role.SECRETARIA)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body('idPatient', ParseIntPipe) idPatient: number,
    @Body() restOfCreateLabDto: Partial<CreateLabDto>,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<LabResponseDto> {
    const createLabDto = { idPatient, ...restOfCreateLabDto };
    return this.labsService.create(createLabDto, file);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.labsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.labsService.remove(id);
  }
}
