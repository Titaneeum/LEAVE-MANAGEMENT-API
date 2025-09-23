import { IsDate, IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateTimeOffRequestDto {
  @IsString()
  type: string;

  @IsString()
  leave_type: number;

  @IsNumber()
  time_off_type: number;

  @IsDateString()
  time_start: string;

  @IsDateString()
  time_end: string;

  @IsDateString()
  day_start: string;

  @IsDateString()
  day_end: string;

  @IsString()
  reason: string;

  supp_document: Buffer;
}
