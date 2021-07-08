import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { DrugName } from './DrugName';
import { DrugCategory } from './DrugCategory';

@Entity()
export class Drug {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => DrugName, (drugName) => drugName.drug)
  names: Promise<DrugName[]>;

  @ManyToMany(() => DrugCategory, (drugCategory) => drugCategory.drugs)
  categories: Promise<DrugCategory[]>;

  @Column('text')
  summary: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  get displayName(): Promise<string> {
    return this.names.then((names) => names.find((name) => name.isDisplayName).text);
  }
}
