import { Module } from '@nestjs/common';
import { LeaveBalanceService } from './leave_balance.service';
import { LeaveBalanceController } from './leave_balance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaveBalance } from './entities/leave_balance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LeaveBalance])],
  controllers: [LeaveBalanceController],
  providers: [LeaveBalanceService],
  exports: [LeaveBalanceService],
})
export class LeaveBalanceModule {}
