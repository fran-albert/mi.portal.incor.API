import { IsInt, IsString } from 'class-validator';

export class CreateDataLabDto {
  @IsInt()
  idLab: number;

  @IsString()
  ldh: string;

  @IsString()
  lonogramaSangre: string;

  @IsString()
  colesterolHdl: string;

  @IsString()
  colesterolLdl: string;

  @IsString()
  trigliceridos: string;

  @IsString()
  uricemia: string;

  @IsString()
  bilirrubina: string;

  @IsString()
  colinesterasaSerica: string;

  @IsString()
  gammaGlutamil: string;

  @IsString()
  t4Libre: string;

  @IsString()
  otros: string;
}
