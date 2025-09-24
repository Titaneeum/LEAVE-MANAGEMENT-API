import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRequestDraftDto } from './dto/create-request_draft.dto';
import { UpdateRequestDraftDto } from './dto/update-request_draft.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestDraft } from './entities/request_draft.entity';

@Injectable()
export class RequestDraftService {
  constructor(
    @InjectRepository(RequestDraft)
    private readonly timeRepo: Repository<RequestDraft>,
  ) {}


  async create(createRequestDraftDto: CreateRequestDraftDto) {
    try{
      const t = this.timeRepo.create({ ...createRequestDraftDto });
      return await this.timeRepo.save(t);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try{
      return await this.timeRepo.find();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number) {
    try{
      return await this.timeRepo.findOneByOrFail({ id });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, updateRequestDraftDto: UpdateRequestDraftDto) {
    try{
      await this.timeRepo.update(id, updateRequestDraftDto);
      return await this.timeRepo.findOneByOrFail({ id });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number) {
    try{
      const toDelete = await this.timeRepo.findOneByOrFail({ id });
      await this.timeRepo.delete(id);
      return { deleted: true };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
