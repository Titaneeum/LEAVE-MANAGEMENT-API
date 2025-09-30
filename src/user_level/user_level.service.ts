import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserLevelDto } from './dto/create-user_level.dto';
import { UpdateUserLevelDto } from './dto/update-user_level.dto';
import { UserLevel } from './entities/user_level.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserLevelService {
  constructor(
    @InjectRepository(UserLevel) private repo: Repository<UserLevel>,
  ) {}
  async create(createUserLevelDto: CreateUserLevelDto) {
    try {
      const userLevel = await this.repo.create(createUserLevelDto);
      return await this.repo.save(userLevel);
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
      return await this.repo.findOne({ where: { userlevel_id: id } });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, updateUserLevelDto: UpdateUserLevelDto) {
    try {
      await this.repo.update(id, updateUserLevelDto);
      return this.repo.findOne({ where: { userlevel_id: id } });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number) {
    try {
      await this.repo.delete(id);
      return { message: 'User level deleted successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
