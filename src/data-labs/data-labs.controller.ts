import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DataLabsService } from './data-labs.service';
import { CreateDataLabDto } from './dto/create-data-lab.dto';
import { UpdateDataLabDto } from './dto/update-data-lab.dto';

@Controller('data-labs')
export class DataLabsController {
  constructor(private readonly dataLabsService: DataLabsService) {}

  @Post()
  create(@Body() createDataLabDto: CreateDataLabDto) {
    return this.dataLabsService.create(createDataLabDto);
  }

  @Get()
  findAll() {
    return this.dataLabsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.dataLabsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateDataLabDto: UpdateDataLabDto) {
    return this.dataLabsService.update(id, updateDataLabDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.dataLabsService.remove(id);
  }
}
