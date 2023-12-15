import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CitiesModule } from './cities/cities.module';
import { StatesModule } from './states/states.module';
import { AuthModule } from './auth/auth.module';
import { LabsModule } from './labs/labs.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'incor_db', 
      password: 'root',
      database: 'miportal_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    CitiesModule,
    StatesModule,
    AuthModule,
    LabsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
