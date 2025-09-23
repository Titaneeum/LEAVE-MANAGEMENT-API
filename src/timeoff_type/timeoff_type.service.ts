import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTimeoffTypeDto } from './dto/create-timeoff_type.dto';
import { UpdateTimeoffTypeDto } from './dto/update-timeoff_type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TimeoffType } from './entities/timeoff_type.entity';

@Injectable()
export class TimeoffTypeService {
  constructor(
    @InjectRepository(TimeoffType)
    private readonly timeOffTypeRepo: Repository<TimeoffType>,
  ) {}
  async create(createTimeoffTypeDto: CreateTimeoffTypeDto) {
    try {
      const timeoffType = this.timeOffTypeRepo.create(createTimeoffTypeDto);
      return await this.timeOffTypeRepo.save(timeoffType);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      return await this.timeOffTypeRepo.find();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number) {
    try {
      return await this.timeOffTypeRepo.findOneByOrFail({ id });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, updateTimeoffTypeDto: UpdateTimeoffTypeDto) {
    try {
      const timeoffType = await this.timeOffTypeRepo.findOneByOrFail({ id });
      const updated = this.timeOffTypeRepo.create({
        id,
        ...updateTimeoffTypeDto,
      });
      return await this.timeOffTypeRepo.save(updated);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number) {
    try {
      const timeoffType = await this.timeOffTypeRepo.findOneByOrFail({ id });
      return await this.timeOffTypeRepo.remove(timeoffType);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
