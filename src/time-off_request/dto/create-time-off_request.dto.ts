import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateTimeOffRequestDto {
  @IsDateString()
  date_start: Date;

  @IsDateString()
  date_end: Date;

  @IsString()
  reason: string;

  @IsNumber()
  created_by: number;
}
