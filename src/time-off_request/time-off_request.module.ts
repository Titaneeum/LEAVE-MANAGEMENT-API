import { Module } from '@nestjs/common';
import { TimeOffRequestService } from './time-off_request.service';
import { TimeOffRequestController } from './time-off_request.controller';
import { TimeOffRequest } from './entities/time-off_request.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TimeOffRequest])],
  controllers: [TimeOffRequestController],
  providers: [TimeOffRequestService],
})
export class TimeOffRequestModule {}
