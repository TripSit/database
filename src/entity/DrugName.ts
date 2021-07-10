import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate,
  BeforeRemove,
} from 'typeorm';
import { Drug } from './Drug';

type DrugNameType = 'common' | 'substitutive' | 'systematic';

/**
 * Substances don't have a single name. Their primary name they will be displayed as in most cases
 * is whichever one has `isDisplayName` set to true.
 */
@Entity()
export class DrugName {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Drug, (drug) => drug.names, { cascade: true })
  drug: Promise<Drug>;

  @Column('text')
  text: string;

  /**
   * Only one name per drug can be set to true.
   */
  @Column('boolean', { default: false })
  isDisplayName: boolean;

  @Column('enum', {
    enum: ['common', 'substitutive', 'systematic'],
  })
  type: DrugNameType;

  @CreateDateColumn()
  createdAt: Date;
}
