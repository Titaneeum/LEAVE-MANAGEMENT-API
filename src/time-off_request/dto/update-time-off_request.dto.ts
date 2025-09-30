import { PartialType } from '@nestjs/mapped-types';
import { CreateTimeOffRequestDto } from './create-time-off_request.dto';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTimeOffRequestDto extends PartialType(
  CreateTimeOffRequestDto,
) {
  @IsNumber()
  updated_by: number;

  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  rejected_reason: string;
}
