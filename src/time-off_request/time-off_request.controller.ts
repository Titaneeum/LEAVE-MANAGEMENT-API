import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TimeOffRequestService } from './time-off_request.service';
import { CreateTimeOffRequestDto } from './dto/create-time-off_request.dto';
import { UpdateTimeOffRequestDto } from './dto/update-time-off_request.dto';

@Controller('time-off-request')
export class TimeOffRequestController {
  constructor(private readonly timeOffRequestService: TimeOffRequestService) {}

  @Post()
  create(@Body() createTimeOffRequestDto: CreateTimeOffRequestDto) {
    return this.timeOffRequestService.create(createTimeOffRequestDto);
  }

  @Get('/all')
  findAll() {
    return this.timeOffRequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timeOffRequestService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTimeOffRequestDto: UpdateTimeOffRequestDto,
  ) {
    return this.timeOffRequestService.update(+id, updateTimeOffRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timeOffRequestService.remove(+id);
  }

  @Get('stats/:status')
  findTimeOffStats(@Param('status') status: string) {
    return this.timeOffRequestService.findTimeOffStats(status);
  }
}
