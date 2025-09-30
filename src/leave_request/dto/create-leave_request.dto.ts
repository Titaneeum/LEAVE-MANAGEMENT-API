import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateLeaveRequestDto {
  @IsString()
  leave_policy: string;

  @IsNumber()
  isHalf_Day: number;

  @IsDateString()
  date_start: Date;

  @IsDateString()
  date_end: Date;

  @IsString()
  reason: string;

  attachment: Buffer;

  @IsNumber()
  created_by: number;
}
