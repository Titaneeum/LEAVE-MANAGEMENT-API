import { PartialType } from '@nestjs/mapped-types';
import { CreateTimeOffRequestDto } from './create-time_off_request.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdateTimeOffRequestDto extends PartialType(CreateTimeOffRequestDto) {
    @IsString()
    status: string;

    @IsString()
    rejected_reason: string;
    
    @IsNumber()
    updated_at: number;

    @IsNumber()
    updated_by: number;
}
