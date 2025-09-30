import { IsNumber } from 'class-validator';
import { Entity } from 'typeorm';

export class CreateLeaveBalanceDto {
  @IsNumber()
  user_id: number;

  @IsNumber()
  annual_leave: number;

  @IsNumber()
  emergency_leave: number;

  @IsNumber()
  unpaid_leave: number;

  @IsNumber()
  hospitalization_leave: number;

  @IsNumber()
  sick_leave: number;
}
