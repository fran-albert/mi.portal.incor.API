import { BadRequestException, Injectable, UploadedFile } from '@nestjs/common';
import { CreateLabDto } from './dto/create-lab.dto';
import { UpdateLabDto } from './dto/update-lab.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lab } from './entities/lab.entity';
import { UsersService } from 'src/users/users.service';
import { Role } from 'src/common/enums/role.enum';
import { UploadService } from 'src/upload/upload.service';
import { v4 as uuidv4 } from 'uuid';
import { LabResponseDto } from './dto/response-lab.dto';

@Injectable()
export class LabsService {
  constructor(
    @InjectRepository(Lab)
    private readonly labRepository: Repository<Lab>,
    private usersService: UsersService,
    private uploadService: UploadService,
  ) {}

  async create(
    createLabDto: CreateLabDto,
    file: Express.Multer.File,
  ): Promise<LabResponseDto> {
    const patient = await this.validatePatient(createLabDto.idPatient);

    await this.validateFile(file);
    const uniqueFileName = this.generateFileName();
    const mimeType = 'application/pdf';
    const fileNameWithExtension = `${uniqueFileName}.pdf`;

    await this.uploadService.uploadFile(
      file.buffer,
      'storage/laboratorios',
      fileNameWithExtension,
      mimeType,
    );

    const newLab = {
      ...createLabDto,
      user: patient,
      file: uniqueFileName,
    };

    const savedLab = await this.labRepository.save(newLab);

    const labResponse = new LabResponseDto();
    labResponse.id = savedLab.id;
    labResponse.name = savedLab.name;
    labResponse.date = savedLab.date;
    labResponse.file = savedLab.file;

    return labResponse;
  }

  async findOne(id: number) {
    const lab = await this.labRepository.findOneBy({ id });

    if (!lab) {
      throw new BadRequestException('Lab not found');
    }

    return lab;
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.labRepository.softDelete({ id });
  }

  async validatePatient(id: number) {
    const user = await this.usersService.findOne(id);

    if (!user.role?.includes(Role.PACIENTE)) {
      throw new BadRequestException('El usuario no es un paciente');
    }

    return user;
  }

  async validateFile(file: Express.Multer.File): Promise<void> {
    if (!file || file.mimetype !== 'application/pdf') {
      throw new BadRequestException('El archivo debe ser un PDF');
    }
  }

  generateFileName(): string {
    const uniqueFileName = uuidv4();
    return `${uniqueFileName}`;
  }
}
