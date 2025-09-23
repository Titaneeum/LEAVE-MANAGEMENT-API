import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private users: UserService) {}

  @Post()
  create(@Body() body: {name: string, email: string, password: string}) {
    return this.users.createUser(body);
  }

  @Get(':email')
  find(@Param('email') email: string) {
    return this.users.findUserByEmail(email);
  }
}
