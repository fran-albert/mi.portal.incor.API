import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LabsService } from './labs.service';
import { CreateLabDto } from './dto/create-lab.dto';
import { UpdateLabDto } from './dto/update-lab.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';

@Controller('labs')
export class LabsController {
  constructor(private readonly labsService: LabsService) {}

  // @Auth(Role.SECRETARIA)
  @Post()
  create(@Body() createLabDto: CreateLabDto) {
    return this.labsService.create(createLabDto);
  }

  @Get()
  findAll() {
    return this.labsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.labsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateLabDto: UpdateLabDto) {
    return this.labsService.update(id, updateLabDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.labsService.remove(id);
  }
}
