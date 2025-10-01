import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserInfoDto } from './dto/update-userInfo.dto';
import { UpdateUserLoginDto } from './dto/update-userLogin.dto';
import { UpdateUserLastUpdateDto } from './dto/update-userLastUpdate.dto';
import { LeaveBalanceService } from 'src/leave_balance/leave_balance.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private readonly leaveBalanceService: LeaveBalanceService,
  ) {}

  async findUserByEmail(email: string) {
    const user = await this.repo.findOne({ where: { user_email: email } });
    if (!user)
      throw new NotFoundException(`User with email "${email}" not found`);
    return user;
  }

  async findUserById(id: number) {
    try {
      const user = await this.repo.findOne({ where: { user_id: id } });
      if (!user) throw new NotFoundException(`User with ID "${id}" not found`);
      return { ...user, user_password: undefined };
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    const existing = await this.repo.findOne({
      where: { user_email: createUserDto.user_email },
    });
    if (existing) {
      throw new ConflictException('User with this email already exists');
    }

    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(createUserDto.user_password, salt);

    const user = await this.repo.create({
      ...createUserDto,
      user_password: hash,
    });

    const saved = await this.repo.save(user);

    const { user_password, ...safe } = saved as any;
    return safe;
  }

  async createUserwithBalance(createUserDto: CreateUserDto) {
    try {
      const user = await this.createUser(createUserDto);
      const userId = user.user_id;
      if (!user) throw new BadRequestException('Cannot create user');

      const leaveBalance = await this.leaveBalanceService.create({
        user_id: userId,
        annual_leave: 30,
        emergency_leave: 30,
        unpaid_leave: 30,
        hospitalization_leave: 30,
        sick_leave: 30,
      });
      if (!leaveBalance) {
        await this.deleteUser(userId);
        throw new BadRequestException(
          'Cannot create leave balance. Please try to register again.',
        );
      }

      return { message: 'User created successfully' };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async updateUser(id: number, UpdateUserInfoDto: UpdateUserInfoDto) {
    try {
      const user = await this.repo.findOne({ where: { user_id: id } });
      if (!user) {
        throw new NotFoundException(`User with ID "${id}" not found`);
      }

      if (UpdateUserInfoDto.user_password) {
        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(UpdateUserInfoDto.user_password, salt);
        UpdateUserInfoDto.user_password = hash;
      }

      Object.assign(user, UpdateUserInfoDto);
      const saved = await this.repo.save(user);
      await this.updateLastUpdate(user.user_id, { last_update: new Date() });
      const { password, ...safe } = saved as any;
      return safe;
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }

  async deleteUser(id: number) {
    try {
      const user = await this.repo.findOne({ where: { user_id: id } });
      if (!user) {
        throw new NotFoundException(`User with ID "${id}" not found`);
      }
      return await this.repo.remove(user);
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }

  async updateLastLogin(id: number, UpdateUserLoginDto: UpdateUserLoginDto) {
    try {
      await this.repo.update(id, UpdateUserLoginDto);
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }

  async updateLastUpdate(
    id: number,
    updateUserLastUpdateDto: UpdateUserLastUpdateDto,
  ) {
    try {
      await this.repo.update(id, updateUserLastUpdateDto);
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
