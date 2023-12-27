import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { CitiesService } from './cities.service';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get()
  findAll() {
    return this.citiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.citiesService.findOne(+id);
  }

  @Get('byState/:idState')
  findByIdState(@Param('idState') stateId: string) {
    return this.citiesService.findByIdState(+stateId);
  }
}
