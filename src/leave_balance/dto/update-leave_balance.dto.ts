import { PartialType } from '@nestjs/mapped-types';
import { CreateLeaveBalanceDto } from './create-leave_balance.dto';

export class UpdateLeaveBalanceDto extends PartialType(CreateLeaveBalanceDto) {}
