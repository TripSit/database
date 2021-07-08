import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Drug } from './Drug';

type DrugNameType = 'common' | 'substitutive' | 'systematic';

@Entity()
export class DrugName {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Drug, (drug) => drug.names, { cascade: true })
  drug: Promise<Drug>;

  @Column('text')
  text: string;

  @Column('boolean', { default: false })
  isDisplayName: boolean;

  @Column('enum', {
    enum: ['common', 'substitutive', 'systematic']
  })
  type: DrugNameType;

  @CreateDateColumn()
  createdAt: Date;
}
