import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  user_name: string;

  @IsString()
  user_email: string;

  @IsString()
  user_department: string;

  @IsString()
  user_password: string;

  @IsNumber()
  userlevel_id: number;

  user_profilePic: Buffer;
}
