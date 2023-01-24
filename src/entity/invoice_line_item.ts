import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { EntityContent } from '../utils/entityTemplate';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import { items } from './items';
import { invoice } from './invoice';

@Entity()
export class invoice_line_item extends EntityContent {
  @ManyToOne((_) => invoice)
  @JoinColumn({ name: 'invoice_id', referencedColumnName: 'id' })
  @Column({ nullable: true })
  @IsNotEmpty()
  invoice_id: number;

  @ManyToOne((_) => items)
  @JoinColumn({ name: 'item_id', referencedColumnName: 'id' })
  @Column({ nullable: true })
  @IsNotEmpty()
  item_id: number;

  @Column({ type: 'varchar' })
  item_description: string;

  @Column({ type: 'decimal' })
  @Transform(parseFloat)
  @IsNumber()
  weight: number;

  @Column({ type: 'integer' })
  @IsNumber()
  quantity: number;

  @Column({ type: 'decimal' })
  @Transform(parseFloat)
  @IsNumber()
  rate: number;

  @Column({ type: 'decimal' })
  @Transform(parseFloat)
  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
