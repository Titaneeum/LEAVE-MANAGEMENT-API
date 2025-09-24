import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('request_draft')
export class RequestDraft {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    user_id: number;
    
    @Column()
    type: string;
    
    @Column()
    leave_type: number;
    
    @Column()
    time_off_type: number;
    
    @Column({ type: 'timestamp', nullable: true })
    time_start: Date;
    
    @Column({ type: 'timestamp', nullable: true })
    time_end: Date;
    
    @Column({ type: 'timestamp', nullable: true })
    date_start: Date;
    
    @Column({ type: 'timestamp', nullable: true })
    date_end: Date;
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', nullable: true })
    updated_at: Date;
    
    @Column({ nullable: true })
    reason: string;
    
    @Column({ type: 'mediumblob', nullable: true, name: 'supp_document' })
    supp_document?: Buffer | null;
}
