import { IsDate, IsString } from "class-validator";


export class CreateTimeOffRequestDto {
    @IsString()
    type: string;

    @IsString()
    leave_type: string;

    @IsString()
    time_off_type: string;
    
    @IsDate()
    time_start: Date;

    @IsDate()
    time_end: Date;
    
    @IsDate()
    day_start: Date;

    @IsDate()
    day_end: Date;

    @IsString()
    reason: string;

    supp_document: Buffer;

}
