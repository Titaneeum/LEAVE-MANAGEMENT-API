import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LeaveBalanceService } from './leave_balance.service';
import { CreateLeaveBalanceDto } from './dto/create-leave_balance.dto';
import { UpdateLeaveBalanceDto } from './dto/update-leave_balance.dto';

@Controller('leave-balance')
export class LeaveBalanceController {
  constructor(private readonly leaveBalanceService: LeaveBalanceService) {}

  @Post()
  create(@Body() createLeaveBalanceDto: CreateLeaveBalanceDto) {
    return this.leaveBalanceService.create(createLeaveBalanceDto);
  }

  @Get('/all')
  findAll() {
    return this.leaveBalanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leaveBalanceService.findOne(+id);
  }

  @Get('/user/:id')
  findBalanceByUserId(@Param('id') id: string) {
    return this.leaveBalanceService.findBalanceByUserId(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLeaveBalanceDto: UpdateLeaveBalanceDto,
  ) {
    return this.leaveBalanceService.update(+id, updateLeaveBalanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leaveBalanceService.remove(+id);
  }
}
