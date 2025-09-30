import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserLevelService } from './user_level.service';
import { CreateUserLevelDto } from './dto/create-user_level.dto';
import { UpdateUserLevelDto } from './dto/update-user_level.dto';

@Controller('user-level')
export class UserLevelController {
  constructor(private readonly userLevelService: UserLevelService) {}

  @Post()
  create(@Body() createUserLevelDto: CreateUserLevelDto) {
    return this.userLevelService.create(createUserLevelDto);
  }

  @Get('/all')
  findAll() {
    return this.userLevelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userLevelService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserLevelDto: UpdateUserLevelDto,
  ) {
    return this.userLevelService.update(+id, updateUserLevelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userLevelService.remove(+id);
  }
}
