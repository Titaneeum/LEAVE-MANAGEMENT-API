import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guard/auth.guard';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Post('login')
  login(@Body() input: { email: string; password: string }) {
    return this.authService.authenticate(input);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getUserInfo(@Request() request) {
    return request.user;
  }

  @Patch('update')
  updateUser(
    @Body()
    body: {
      user_id: number;
      user_name?: string;
      user_email?: string;
      user_department?: string;
      user_password?: string;
      userlevel_id?: number;
    },
  ) {
    return this.authService.updateUser(body.user_id, body);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.authService.deleteUser(id);
  }

  @Get(':id')
  findUserById(@Param('id') id: number) {
    return this.authService.findUserById(id);
  }
}
