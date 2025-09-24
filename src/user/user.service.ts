import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.repo.findOne({ where: { email } });
    if (!user)
      throw new NotFoundException(`User with email "${email}" not found`);
    return user;
  }

  async createUser(data : {name: string, email: string, password: string}) {
    const existing = await this.repo.findOne({ where: { email: data.email } });
    if (existing) {
      throw new ConflictException('User with this email already exists');
    }

    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(data.password, salt);

    const user = this.repo.create({ ...data, password: hash });
    const saved = this.repo.save(user);

    const { password, ...safe} = saved as any;
    return safe;
  }
}
