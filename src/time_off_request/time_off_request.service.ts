import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTimeOffRequestDto } from './dto/create-time_off_request.dto';
import { UpdateTimeOffRequestDto } from './dto/update-time_off_request.dto';
import { TimeOffRequest } from './entities/time_off_request.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
    return this.timeRepo.save(t);
  }

  findAll() {
    return this.timeRepo.find();
  }

  findOne(id: number) {
    return this.timeRepo.findOneBy({ id });
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
    return this.timeRepo.findOneBy({ id });
  }

  async remove(id: number) {
    const findId = await this.timeRepo.findOne({ where: { id } });
    console.log(findId);
    if (!findId) {
      throw new BadRequestException('ID not found');
    }

    await this.timeRepo.delete(id);
    return { deleted: true };
  }
}
