import { Entity, Column } from 'typeorm';
import { EntityContent } from '../utils/entityTemplate';
import { IsIn, IsNotEmpty, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

@Entity()
export class items extends EntityContent {
  @Column()
  @IsNotEmpty()
  name: string;

  @Column('decimal')
  @Transform(parseFloat)
  @IsNumber()
  @IsNotEmpty()
  weight: number;

  @Column()
  @IsNotEmpty()
  @IsIn(['Gold', 'Silver', 'Artificial'])
  type: 'Gold' | 'Silver' | 'Artificial';

  @Column('int')
  @Transform(parseFloat)
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}