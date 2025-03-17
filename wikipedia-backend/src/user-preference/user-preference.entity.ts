import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UserPreference {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  userId!: string; // Identificador único para el usuario

  @Column({ default: 'en' })
  language!: string;

  @Column({ default: false })
  darkMode!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
