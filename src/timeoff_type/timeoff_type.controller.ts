import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TimeoffTypeService } from './timeoff_type.service';
import { CreateTimeoffTypeDto } from './dto/create-timeoff_type.dto';
import { UpdateTimeoffTypeDto } from './dto/update-timeoff_type.dto';

@Controller('timeoff-type')
export class TimeoffTypeController {
  constructor(private readonly timeoffTypeService: TimeoffTypeService) {}

  @Post()
  create(@Body() createTimeoffTypeDto: CreateTimeoffTypeDto) {
    return this.timeoffTypeService.create(createTimeoffTypeDto);
  }

  @Get(':all')
  findAll() {
    return this.timeoffTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timeoffTypeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTimeoffTypeDto: UpdateTimeoffTypeDto,
  ) {
    return this.timeoffTypeService.update(+id, updateTimeoffTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timeoffTypeService.remove(+id);
  }
}
