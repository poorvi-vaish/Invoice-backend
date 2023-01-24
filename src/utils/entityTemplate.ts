import * as bcrypt from 'bcrypt';
import { IsDefined, IsNotEmpty } from 'class-validator';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

export abstract class EntityContent {
  @PrimaryGeneratedColumn() id: number;

  @CreateDateColumn({ type: 'timestamp' }) created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' }) updated_at: Date;
}


