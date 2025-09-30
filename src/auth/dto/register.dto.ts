import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  user_name: string;

  @IsEmail()
  user_email: string;

  @IsNotEmpty()
  user_department: string;

  @MinLength(6)
  user_password: string;

  @IsOptional()
  @IsEnum([1, 2, 3])
  userlevel_id: number = 3; // Default to 'user' level

  user_profilePic: Buffer;
}
