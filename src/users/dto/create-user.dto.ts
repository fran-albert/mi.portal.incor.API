import {
  IsArray,
  IsDateString,
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from 'src/common/enums/role.enum';
export class CreateUserDto {
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

  @IsInt()
  @IsPositive()
  idCity: number;

  @IsString()
  @IsOptional()
  photo?: string;

  @IsString()
  healthInsurance: string;

  @IsEnum(Role, { each: true })
  role?: Role[];
}
