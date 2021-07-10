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
import { DrugVariant } from './DrugVariant';

@Entity()
export class Drug {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => DrugName, (name) => name.drug)
  names: Promise<DrugName[]>;

  @ManyToMany(() => DrugCategory, (drugCategory) => drugCategory.drugs)
  categories: Promise<DrugCategory[]>;

  @OneToMany(() => DrugVariant, (variant) => variant.drug)
  variants: Promise<DrugVariant[]>;

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
