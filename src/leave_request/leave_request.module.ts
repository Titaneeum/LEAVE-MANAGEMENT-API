import { Module } from '@nestjs/common';
import { LeaveRequestService } from './leave_request.service';
import { LeaveRequestController } from './leave_request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaveRequest } from './entities/leave_request.entity';
import { LeaveBalanceService } from 'src/leave_balance/leave_balance.service';
import { LeaveBalanceModule } from 'src/leave_balance/leave_balance.module';

@Module({
  imports: [TypeOrmModule.forFeature([LeaveRequest]), LeaveBalanceModule],
  controllers: [LeaveRequestController],
  providers: [LeaveRequestService],
})
export class LeaveRequestModule {}
