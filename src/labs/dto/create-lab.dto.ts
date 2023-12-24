import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateLabDto {
  @IsInt()
  idPatient: number;
    
  @IsString()
  @IsOptional()
  name?: string;

  @IsDateString()
  @IsOptional()
  date?: Date;
}
