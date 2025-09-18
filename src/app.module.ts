import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimeOffRequestModule } from './time_off_request/time_off_request.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeOffRequest } from './time_off_request/entities/time_off_request.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // or postgres/sqlite/etc
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'leave-management',
      entities: [TimeOffRequest], 
      synchronize: false, // true only for dev
    }),
    TimeOffRequestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
