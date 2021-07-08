import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToMany,
} from 'typeorm';
import { Drug } from './Drug';

type DrugCategoryType = 'psychological' | 'chemical';

@Entity()
export class DrugCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  name: string;

  @Column('enum', {
    enum: ['psychological', 'chemical'],
  })
  type: DrugCategoryType;

  @Column('text')
  summary: string;

  @ManyToMany(() => Drug, (drug) => drug.categories)
  drugs: Promise<Drug[]>;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
