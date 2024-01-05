import { Module } from '@nestjs/common';
import { DataLabsService } from './data-labs.service';
import { DataLabsController } from './data-labs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataLab } from './entities/data-lab.entity';
import { LabsModule } from 'src/labs/labs.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([DataLab]), LabsModule, AuthModule],
  controllers: [DataLabsController],
  providers: [DataLabsService],
  exports: [DataLabsService],
})
export class DataLabsModule {}
