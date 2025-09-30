import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLeaveRequestDto } from './dto/create-leave_request.dto';
import { UpdateLeaveRequestDto } from './dto/update-leave_request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LeaveRequest } from './entities/leave_request.entity';
import { Repository } from 'typeorm';
import { LeaveBalanceService } from 'src/leave_balance/leave_balance.service';

@Injectable()
export class LeaveRequestService {
  constructor(
    @InjectRepository(LeaveRequest) private repo: Repository<LeaveRequest>,
    private readonly leaveBalanceService: LeaveBalanceService,
  ) {}

  async create(createLeaveRequestDto: CreateLeaveRequestDto) {
    try {
      const leaveRequest = this.repo.create(createLeaveRequestDto);
      if(!leaveRequest) 
        throw new BadRequestException('Cannot create leave request');

      const updated = await this.leaveBalanceService.findBalanceByUserId(createLeaveRequestDto.created_by);
      const policy = leaveRequest.leave_policy;
      if(policy === 'annual_leave'){ 
        if(leaveRequest.isHalf_Day === 1){
          updated.annual_leave -= 0.5;
          await this.leaveBalanceService.update(createLeaveRequestDto.created_by, {annual_leave: updated.annual_leave});
        }
        else{
          updated.annual_leave -= 1;
          await this.leaveBalanceService.update(createLeaveRequestDto.created_by, {annual_leave: updated.annual_leave});
        }
      } else if(policy === 'emergency_leave'){
          updated.emergency_leave -= 1;
          await this.leaveBalanceService.update(createLeaveRequestDto.created_by, {emergency_leave: updated.emergency_leave});
      } else if(policy === 'unpaid_leave'){
          updated.unpaid_leave -= 1;
          await this.leaveBalanceService.update(createLeaveRequestDto.created_by, {unpaid_leave: updated.unpaid_leave});
      } else if(policy === 'hospitalization_leave'){
          updated.hospitalization_leave -= 1;
          await this.leaveBalanceService.update(createLeaveRequestDto.created_by, {hospitalization_leave: updated.hospitalization_leave});
      } else if(policy === 'sick_leave'){
          updated.sick_leave -= 1;
          await this.leaveBalanceService.update(createLeaveRequestDto.created_by, {sick_leave: updated.sick_leave});
      }
      return await this.repo.save(leaveRequest);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: number) {
    try {
      const findID = await this.repo.findOne({ where: { leave_id: id } });
      if (!findID) throw new NotFoundException('Leave request not found');
      return findID;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, updateLeaveRequestDto: UpdateLeaveRequestDto) {
    try {
      const findID = await this.repo.findOne({ where: { leave_id: id } });
      if (!findID)
        throw new NotFoundException(
          'Cannot update leave request. Leave request not found',
        );
      const status = updateLeaveRequestDto.status;
      const policy = findID.leave_policy;
      const isHalfDay = findID.isHalf_Day;
      
      if(status === 'rejected'){
        const updated = await this.leaveBalanceService.findBalanceByUserId(findID.created_by);
        if(policy === 'annual_leave'){ 
          if(isHalfDay === 1){
            updated.annual_leave = Number(updated.annual_leave) + 0.5;
            await this.leaveBalanceService.update(findID.created_by, {annual_leave: updated.annual_leave});
          }
          else{
            updated.annual_leave = Number(updated.annual_leave) + 1;
            await this.leaveBalanceService.update(findID.created_by, {annual_leave: updated.annual_leave});
          }
        } else if(policy === 'emergency_leave'){
            updated.emergency_leave = Number(updated.emergency_leave) + 1;
            await this.leaveBalanceService.update(findID.created_by, {emergency_leave: updated.emergency_leave});
        } else if(policy === 'unpaid_leave'){
            updated.unpaid_leave = Number(updated.unpaid_leave) + 1;
            await this.leaveBalanceService.update(findID.created_by, {unpaid_leave: updated.unpaid_leave});
        } else if(policy === 'hospitalization_leave'){
            updated.hospitalization_leave = Number(updated.hospitalization_leave) + 1;
            await this.leaveBalanceService.update(findID.created_by, {hospitalization_leave: updated.hospitalization_leave});
        } else if(policy === 'sick_leave'){
            updated.sick_leave = Number(updated.sick_leave) + 1;
            await this.leaveBalanceService.update(findID.created_by, {sick_leave: updated.sick_leave});
        }
      }
      const update = await this.repo.update(id, updateLeaveRequestDto);
      if (!update)
        throw new NotFoundException('Cannot update leave request.');
      return { message: 'Leave request updated successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number) {
    try {
      const findID = await this.repo.findOne({ where: { leave_id: id } });
      if (!findID)
        throw new NotFoundException(
          'Cannot delete leave request. Leave request not found',
        );
      const deleteLeave = await this.repo.delete(id);
      if(!deleteLeave) 
        throw new BadRequestException('Cannot delete leave request.');
      return { message: 'Leave request deleted successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findLeaveStats(statuS: string) {
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
