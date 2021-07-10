import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Drug } from './Drug';
import { DrugRouteOfAdministration } from './DrugRouteOfAdministration';

/**
 * Allows for there to be seperate values between salts, freebase form, and any other
 * particulars such as formulations such as Adderall. Prodrugs like lisdexamfetamine (Vyvanse)
 * should be classified as a seperate drug, not a drug variant. Sometimes a drug will only
 * have a single variant representing it. The purpose of this is for example, DMT-fumerate's dose
 * differs from DMT-citrate's dosage for the same active molocule.
 */
@Entity()
export class DrugVariant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @ManyToOne(() => Drug, (drug) => drug.variants, { cascade: true })
  drug: Promise<Drug>;

  @OneToMany(() => DrugRouteOfAdministration, (roa) => roa.variant)
  roas: Promise<DrugRouteOfAdministration[]>;

  @Column('float', { nullable: true })
  thresholdMg: number;

  @Column('float', { nullable: true })
  lightMg: number;

  @Column('float', { nullable: true })
  commonMg: number;

  @Column('float', { nullable: true })
  strongMg: number;

  @Column('float', { nullable: true })
  heavyMg: number;

  @Column('text', { nullable: true })
  doseNotes: string;

  @Column('float', { nullable: true })
  onsetMins: number;

  @Column('float', { nullable: true })
  peakMins: number;

  @Column('float', { nullable: true })
  offsetMins: number;

  @Column('float', { nullable: true })
  afterEffectMins: number;

  @Column('text', { nullable: true })
  durationNotes: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
