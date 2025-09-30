import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('leave_balance')
export class LeaveBalance {
  @PrimaryGeneratedColumn()
  bal_id: number;

  @Column()
  user_id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  annual_leave: number;

  @Column('decimal', { precision: 10, scale: 2 })
  emergency_leave: number;

  @Column('decimal', { precision: 10, scale: 2 })
  unpaid_leave: number;

  @Column('decimal', { precision: 10, scale: 2 })
  hospitalization_leave: number;

  @Column('decimal', { precision: 10, scale: 2 })
  sick_leave: number;
}
