import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import FileTypePipe from 'src/common/pipes/file-type.pipe';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new FileTypePipe(['application/pdf', 'image/png', 'image/jpeg']),
    )
    file: Express.Multer.File,
  ) {
    let folder = 'storage/avatar';
    let fileExtension = '';

    if (file.mimetype === 'application/pdf') {
      folder = 'storage/laboratorios';
      fileExtension = '.pdf';
    } else if (file.mimetype === 'image/png') {
      fileExtension = '.png';
    } else if (file.mimetype === 'image/jpeg') {
      fileExtension = '.jpeg';
    }
    await this.uploadService.uploadFile(
      file.buffer,
      folder,
      fileExtension,
      file.mimetype,
    );
  }
}
