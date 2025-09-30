import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user_level')
export class UserLevel {
  @PrimaryGeneratedColumn()
  userlevel_id: number;

  @Column()
  userlevel_name: string;

  @CreateDateColumn()
  created_at: Date;
}
