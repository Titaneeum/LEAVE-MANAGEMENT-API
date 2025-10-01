import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaveBalanceModule } from 'src/leave_balance/leave_balance.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), LeaveBalanceModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
