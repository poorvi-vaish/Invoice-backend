import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { EntityContent } from '../utils/entityTemplate';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import { customers } from './customers';
import { Col } from 'sequelize/types/lib/utils';

@Entity()
export class invoice extends EntityContent {
  // @ManyToOne((_) => customers)
  // @JoinColumn({ name: 'customer_id', referencedColumnName: 'id' })
  // @Column({ nullable: true })
  // @IsNotEmpty()
  // customer_id: number;

  @Column({ type: 'varchar' })
  @IsNotEmpty()
  customer_name: string;

  @Column({ type: 'varchar', nullable: true })
  customer_address: string;

  @Column({ type: 'varchar', nullable: true })
  customer_phone: string;

  @Column({ type: 'varchar', nullable: true })
  customer_email: string;

  @Column({ type: 'decimal' })
  @Transform(parseFloat)
  @IsNumber()
  amount: number;

  @Column({ type: 'decimal' })
  @Transform(parseFloat)
  @IsNumber()
  @IsNotEmpty()
  total: number;

  @Column({ type: 'decimal', nullable: true })
  @Transform(parseFloat)
  @IsNumber()
  discount: number;

  @Column({ type: 'date' })
  @IsNotEmpty()
  date: string;

  @Column({ type: 'varchar', nullable: true })
  notes: string;

  @Column({ type: 'boolean', default: false })
  @IsNotEmpty()
  gst: boolean;

  @Column({ type: 'decimal', nullable: true })
  @Transform(parseFloat)
  @IsNumber()
  cgst_amount: number;

  @Column({ type: 'decimal', nullable: true })
  @Transform(parseFloat)
  @IsNumber()
  sgst_amount: number;

  @Column({ type: 'decimal', nullable: true })
  @Transform(parseFloat)
  @IsNumber()
  received_amount: number;

  @Column({ type: 'decimal', nullable: true })
  @Transform(parseFloat)
  @IsNumber()
  balance_amount: number;

  @Column({ type: 'varchar', nullable: true })
  invoice_name: string;

  @Column({ type: 'varchar', nullable: true })
  @IsNotEmpty()
  payment_type: string;
}
