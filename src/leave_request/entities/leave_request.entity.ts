import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('leave_request')
export class LeaveRequest {
  @PrimaryGeneratedColumn()
  leave_id: number;

  @Column()
  leave_policy: string;

  @Column()
  isHalf_Day: number;

  @Column()
  date_start: Date;

  @Column()
  date_end: Date;

  @Column()
  reason: string;

  @Column()
  attachment: Buffer;

  @Column()
  created_by: number;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  updated_by: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ default: 'user' })
  status: string;

  @Column()
  rejected_reason: string;
}
