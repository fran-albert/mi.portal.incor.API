import { IsInt, IsString } from 'class-validator';

export class LabResponseDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;
  date: Date;

  @IsString()
  file: string;
}
