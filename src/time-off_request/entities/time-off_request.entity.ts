import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('timeOff_request')
export class TimeOffRequest {
  @PrimaryGeneratedColumn()
  timeOff_id: number;

  @Column()
  date_start: Date;

  @Column()
  date_end: Date;

  @Column()
  reason: string;

  @Column()
  created_by: number;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  updated_by: number;

  @Column()
  updated_at: Date;

  @Column()
  status: string;

  @Column()
  rejected_reason: string;
}
