import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('time_off_request')
export class TimeOffRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  type: string;

  @Column()
  leave_type: string;

  @Column()
  time_off_type: string;

  @Column({ type: 'timestamp', nullable: true })
  time_start: Date;

  @Column({ type: 'timestamp', nullable: true })
  time_end: Date;

  @Column({ type: 'timestamp', nullable: true })
  day_start: Date;

  @Column({ type: 'timestamp', nullable: true })
  day_end: Date;

  @Column({ default: 'pending' })
  status: string;

  @Column({ nullable: true })
  rejected_reason: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column()
  created_by: number;

  @Column({ nullable: true })
  reason: string;

  @Column({ type: 'mediumblob', nullable: true, name: 'supp_document' })
  supp_document?: Buffer | null;

  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;

  @Column({ nullable: true })
  updated_by: number;
}
