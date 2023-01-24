import { Entity, Column } from 'typeorm';
import { EntityContent } from '../utils/entityTemplate';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class customers extends EntityContent {
  @Column()
  @IsNotEmpty()
  name: string;

  @Column('text')
  @IsNotEmpty()
  address: string;

  @Column()
  @IsNotEmpty()
  mobile: string;

  @Column()
  email: string;
}
