import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLeaveTypeDto } from './dto/create-leave_type.dto';
import { UpdateLeaveTypeDto } from './dto/update-leave_type.dto';
import { Repository } from 'typeorm';
import { LeaveType } from './entities/leave_type.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LeaveTypeService {
  constructor(
    @InjectRepository(LeaveType)
    private readonly leaveTypeRepo: Repository<LeaveType>,
  ) {}

  async create(createLeaveTypeDto: CreateLeaveTypeDto) {
    try {
      const leaveType = this.leaveTypeRepo.create(createLeaveTypeDto);
      return await this.leaveTypeRepo.save(leaveType);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    return await this.leaveTypeRepo.find();
  }

  async findOne(id: number) {
    try {
      return await this.leaveTypeRepo.findOneByOrFail({ id });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, updateLeaveTypeDto: UpdateLeaveTypeDto) {
    try {
      await this.leaveTypeRepo.findOneByOrFail({ id });
      const leaveType = this.leaveTypeRepo.create({
        id,
        ...updateLeaveTypeDto,
      });
      return await this.leaveTypeRepo.save(leaveType);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number) {
    try {
      const leaveType = await this.leaveTypeRepo.findOneByOrFail({ id });
      return await this.leaveTypeRepo.remove(leaveType);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
