import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('leave_balance')
export class LeaveBalance {
  @PrimaryGeneratedColumn()
  bal_id: number;

  @Column()
  user_id: number;

  @Column('decimal', { precision: 10, scale: 2, default: 30 })
  annual_leave: number;

  @Column('decimal', { precision: 10, scale: 2, default: 30 })
  emergency_leave: number;

  @Column('decimal', { precision: 10, scale: 2, default: 30 })
  unpaid_leave: number;

  @Column('decimal', { precision: 10, scale: 2, default: 30 })
  hospitalization_leave: number;

  @Column('decimal', { precision: 10, scale: 2, default: 30 })
  sick_leave: number;
}
