import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  user_name: string;

  @Column({ unique: true, nullable: false })
  user_email: string;

  @Column()
  user_department: string;

  @Column()
  user_password: string;

  @Column()
  userlevel_id: number;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  last_update: Date;

  @Column()
  last_login: Date;

  @Column()
  user_profilePic: Buffer;
}
