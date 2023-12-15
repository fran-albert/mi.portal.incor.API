import { PartialType } from '@nestjs/swagger';
import { CreateDataLabDto } from './create-data-lab.dto';

export class UpdateDataLabDto extends PartialType(CreateDataLabDto) {}
