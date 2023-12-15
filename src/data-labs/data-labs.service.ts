import { Injectable } from '@nestjs/common';
import { CreateDataLabDto } from './dto/create-data-lab.dto';
import { UpdateDataLabDto } from './dto/update-data-lab.dto';

@Injectable()
export class DataLabsService {
  create(createDataLabDto: CreateDataLabDto) {
    return 'This action adds a new dataLab';
  }

  findAll() {
    return `This action returns all dataLabs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dataLab`;
  }

  update(id: number, updateDataLabDto: UpdateDataLabDto) {
    return `This action updates a #${id} dataLab`;
  }

  remove(id: number) {
    return `This action removes a #${id} dataLab`;
  }
}
