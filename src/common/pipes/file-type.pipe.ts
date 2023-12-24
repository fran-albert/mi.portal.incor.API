import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileTypePipe implements PipeTransform {
  private allowedTypes: string[];

  constructor(allowedTypes: string[]) {
    this.allowedTypes = allowedTypes;
  }

  transform(file: Express.Multer.File): Express.Multer.File {
    if (!this.allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException('Tipo de archivo no permitido.');
    }
    return file;
  }
}

export default FileTypePipe;
