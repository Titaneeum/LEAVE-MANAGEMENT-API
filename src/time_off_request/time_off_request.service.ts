import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTimeOffRequestDto } from './dto/create-time_off_request.dto';
import { UpdateTimeOffRequestDto } from './dto/update-time_off_request.dto';
import { TimeOffRequest } from './entities/time_off_request.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';

@Injectable()
export class TimeOffRequestService {
  constructor(
    @InjectRepository(TimeOffRequest)
    private readonly timeRepo: Repository<TimeOffRequest>,
  ) {}

  async create(
    createTimeOffRequestDto: CreateTimeOffRequestDto,
    file: Express.Multer.File | null,
  ) {
    const t = this.timeRepo.create({
      ...createTimeOffRequestDto,
      supp_document: file ? file.buffer : null,
    });

    try {
      return await this.timeRepo.save(t);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new BadRequestException(error.message);
      } else {
        throw error;
      }
    }
  }

  async findAll() {
    const find = this.timeRepo.find();

    try {
      return await find;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new BadRequestException(error.message);
      } else {
        throw error;
      }
    }
  }

  async findOne(id: number) {
    const findOne = this.timeRepo.findOneByOrFail({ id });
    try {
      return await findOne;
    } catch (error) {
      throw new NotFoundException('ID not found');
    }
  }

  async getRawBlobByRequestId(id: number): Promise<Buffer | null> {
    const r = await this.timeRepo.findOne({
      where: { id },
      select: ['supp_document'],
    });
    return r?.supp_document ?? null;
  }

  async update(id: number, updateTimeOffRequestDto: UpdateTimeOffRequestDto) {
    await this.timeRepo.update(id, updateTimeOffRequestDto);
    const updated = await this.timeRepo.findOneBy({ id });
    if (!updated)
      throw new BadRequestException('Could not update time off request');
    return updated;
  }

  async remove(id: number) {
    const findId = await this.timeRepo.findOne({ where: { id } });
    if (!findId) {
      throw new BadRequestException('ID not found');
    }

    await this.timeRepo.delete(id);
    return { deleted: true };
  }
}
