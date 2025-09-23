import { IsDate, IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateTimeoffTypeDto {
  @IsString()
  name: string;

  @IsNumber()
  created_by: number;
}
