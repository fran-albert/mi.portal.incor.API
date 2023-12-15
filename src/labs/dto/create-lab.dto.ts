import { IsDateString, IsInt, IsString } from 'class-validator';

export class CreateLabDto {

  @IsInt()
  idPatient: number;
    
  @IsString()
  name: string;

  @IsDateString()
  date: Date;
}
