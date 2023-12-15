import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLabDto } from './dto/create-lab.dto';
import { UpdateLabDto } from './dto/update-lab.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lab } from './entities/lab.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class LabsService {
  constructor(
    @InjectRepository(Lab)
    private readonly labRepository: Repository<Lab>,
    private usersService: UsersService,
  ) {}

  async create(createLabDto: CreateLabDto) {
    const patient = await this.validatePatient(createLabDto.idPatient);

    const newLab = {
      ...createLabDto,
      user: patient,
    };

    return await this.labRepository.save(newLab);
  }

  findAll() {
    return `This action returns all labs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lab`;
  }

  update(id: number, updateLabDto: UpdateLabDto) {
    return `This action updates a #${id} lab`;
  }

  remove(id: number) {
    return `This action removes a #${id} lab`;
  }

  async validatePatient(id: number) {
    const user = await this.usersService.findOne(id);

    if (!user.role?.includes(Role.PACIENTE)) {
      throw new BadRequestException('El usuario no es un paciente');
    }

    return user;
  }
}
