// src/request-log/request-log.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class RequestLog {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  method!: string;

  @Column()
  url!: string;

  @Column({ nullable: true })
  statusCode!: number;

  @CreateDateColumn()
  timestamp!: Date;
}
