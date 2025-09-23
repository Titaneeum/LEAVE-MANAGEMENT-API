import { Module } from '@nestjs/common';
import { LeaveTypeService } from './leave_type.service';
import { LeaveTypeController } from './leave_type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaveType } from './entities/leave_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LeaveType])],
  controllers: [LeaveTypeController],
  providers: [LeaveTypeService],
})
export class LeaveTypeModule {}
