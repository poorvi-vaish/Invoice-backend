import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { EntityContent } from '../utils/entityTemplate';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import { customers } from './customers';
import { items } from './items';

@Entity()
export class dues extends EntityContent {
  @ManyToOne((_) => customers)
  @JoinColumn({ name: 'customer_id', referencedColumnName: 'id' })
  @Column({ nullable: true })
  @IsNotEmpty()
  customer_id: number;

  @Column({ unique: true, type: 'decimal' })
  @Transform(parseFloat)
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @Column({ unique: true, type: 'date' })
  @IsNotEmpty()
  date: string;

  @ManyToOne((_) => items)
  @JoinColumn({ name: 'item_id', referencedColumnName: 'id' })
  @Column({ nullable: true })
  item_id: number;

  @Column({ type: 'varchar' })
  description: string;
}
