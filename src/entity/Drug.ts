import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { DrugName } from './DrugName';

@Entity()
export class Drug {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => DrugName, (drugName) => drugName.drug)
  names: DrugName[];

  @Column('text')
  summary: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  get displayName(): string {
    return this.names.find((name) => name.isDisplayName).text;
  }
}
