import {
  IsDate,
  IsDateString,
  IsEmail,
  IsInt,
  IsNumberString,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  lastname: string;

  @IsString()
  dni: string;

  @IsEmail()
  email: string;

  @IsDateString()
  birthDate: Date;

  @IsString()
  phone: string;

  @IsNumberString()
  idCity: string;

  @IsString()
  @IsOptional()
  photo?: string;

  @IsString()
  healthInsurance: string;
}
