import { PartialType } from '@nestjs/mapped-types';
import { CreateLeaveRequestDto } from './create-leave_request.dto';
import { IsString } from 'class-validator';

export class UpdateLeaveRequestDto extends PartialType(CreateLeaveRequestDto) {
  @IsString()
  updated_by: Date;

  @IsString()
  status: string;

  @IsString()
  rejected_reason: string;
}
