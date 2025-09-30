import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTimeOffRequestDto } from './dto/create-time-off_request.dto';
import { UpdateTimeOffRequestDto } from './dto/update-time-off_request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TimeOffRequest } from './entities/time-off_request.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TimeOffRequestService {
  constructor(
    @InjectRepository(TimeOffRequest) private repo: Repository<TimeOffRequest>,
  ) {}
  async create(createTimeOffRequestDto: CreateTimeOffRequestDto) {
    try {
      const timeOffRequest = await this.repo.create(createTimeOffRequestDto);
      return await this.repo.save(timeOffRequest);
    } catch (error) {
      throw new BadRequestException(error.message);
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
      return await this.repo.findOne({ where: { timeOff_id: id } });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, updateTimeOffRequestDto: UpdateTimeOffRequestDto) {
    try {
      const update = await this.repo.update(id, updateTimeOffRequestDto);
      if (!update)
        throw new NotFoundException('Cannot update time off request.');

      const findID = await this.repo.findOne({ where: { timeOff_id: id } });
      if (!findID) throw new NotFoundException('Time off request not found');
      return { message: 'Time off request updated successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number) {
    try {
      const findID = await this.repo.findOne({ where: { timeOff_id: id } });
      if (!findID)
        throw new NotFoundException(
          'Cannot delete time off request. Time off request not found',
        );

      await this.repo.delete(id);
      return { message: 'Time off request deleted successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findTimeOffStats(statuS: string) {
    try {
      if (
        statuS === 'approved' ||
        statuS === 'rejected' ||
        statuS === 'pending'
      ) {
        const stats = await this.repo.find({ where: { status: statuS } });
        return stats;
      } else {
        throw new NotFoundException('Please enter valid status');
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
