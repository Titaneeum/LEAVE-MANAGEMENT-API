import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLeaveBalanceDto } from './dto/create-leave_balance.dto';
import { UpdateLeaveBalanceDto } from './dto/update-leave_balance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LeaveBalance } from './entities/leave_balance.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LeaveBalanceService {
  constructor(
    @InjectRepository(LeaveBalance) private repo: Repository<LeaveBalance>,
  ) {}
  async create(createLeaveBalanceDto: CreateLeaveBalanceDto) {
    try {
      const leaveBalance = this.repo.create(createLeaveBalanceDto);
      return await this.repo.save(leaveBalance);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async findAll() {
    try {
      return await this.repo.find();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number) {
    try {
      const findID = await this.repo.findOne({ where: { bal_id: id } });
      if (!findID) throw new NotFoundException('Leave balance not found');
      return findID;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findBalanceByUserId(id: number) {
    try {
      const findID = await this.repo.findOne({ where: { user_id: id } });
      if (!findID) 
        throw new NotFoundException('Leave balance not found');
      return findID;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, updateLeaveBalanceDto: UpdateLeaveBalanceDto) {
    try {
      console.log('incoming dto:', updateLeaveBalanceDto);
      const findID = await this.repo.findOne({ where: { user_id: id } });
      if (!findID)
        throw new NotFoundException(
          'Cannot update leave balance. Leave balance not found',
        );

      Object.assign(findID, updateLeaveBalanceDto);
      await this.repo.save(findID);
      return { message: 'Leave balance updated successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number) {
    try {
      const findID = await this.repo.findOne({ where: { bal_id: id } });
      if (!findID)
        throw new NotFoundException(
          'Cannot delete leave balance. Leave balance not found',
        );
      await this.repo.delete(id);
      return { message: 'Leave balance deleted successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
