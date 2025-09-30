import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private users: UserService) {}

  @Post()
  create(@Body() CreateUserDto: CreateUserDto) {
    return this.users.createUser(CreateUserDto);
  }

  @Get(':email')
  find(@Param('email') email: string) {
    return this.users.findUserByEmail(email);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.users.deleteUser(+id);
  }
}
