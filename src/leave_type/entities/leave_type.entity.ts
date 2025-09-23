import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('leave_type')
export class LeaveType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  created_at: Date;

  @Column()
  created_by: number;
}
