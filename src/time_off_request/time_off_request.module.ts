import { Module } from '@nestjs/common';
import { TimeOffRequestService } from './time_off_request.service';
import { TimeOffRequestController } from './time_off_request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeOffRequest } from './entities/time_off_request.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([TimeOffRequest]),
    MulterModule.register({ dest: './uploads' }),
  ],
  controllers: [TimeOffRequestController],
  providers: [TimeOffRequestService],
})
export class TimeOffRequestModule {}
