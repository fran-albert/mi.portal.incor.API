import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDataLabDto } from './dto/create-data-lab.dto';
import { UpdateDataLabDto } from './dto/update-data-lab.dto';
import { DataLab } from './entities/data-lab.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LabsService } from 'src/labs/labs.service';

@Injectable()
export class DataLabsService {
  constructor(
    @InjectRepository(DataLab)
    private readonly dataLabRepository: Repository<DataLab>,
    private readonly labService: LabsService,
  ) {}

  async create(createDataLabDto: CreateDataLabDto) {
    const lab = await this.labService.findOne(createDataLabDto.idLab);

    const newDataLab = {
      ...createDataLabDto,
      lab: lab,
    };

    return this.dataLabRepository.save(newDataLab);
  }

  async findAll() {
    return `This action returns all dataLabs`;
  }

  async findOne(id: number) {
    const dataLab = await this.dataLabRepository.findOneBy({ id });

    if (!dataLab) {
      throw new BadRequestException('DataLab not found');
    }

    return dataLab;
  }

  async update(id: number, updateDataLabDto: UpdateDataLabDto) {
    return `This action updates a #${id} dataLab`;
  }

  async remove(id: number) {
    return `This action removes a #${id} dataLab`;
  }
}
