import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });

  constructor(private readonly configService: ConfigService) {}

  async uploadFile(
    file: Buffer,
    folderPath: string,
    fileName: string,
    mimeType: string,
  ): Promise<string> {
    const fileKey = `${folderPath}/${fileName}`;

    const uploadParams = {
      Bucket: this.configService.getOrThrow('AWS_S3_BUCKET_NAME'),
      Key: fileKey,
      Body: file,
      ContentType: mimeType,
    };

    try {
      await this.s3Client.send(new PutObjectCommand(uploadParams));
      return fileKey;
    } catch (error) {
      console.error('Error en AWS S3:', error);
      throw error;
    }
  }
}
