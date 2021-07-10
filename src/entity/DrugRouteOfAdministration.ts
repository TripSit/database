import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { DrugVariant } from './DrugVariant';

type RouteOfAdministration = 'oral'
| 'insuffilated'
| 'inhaled'
| 'topical'
| 'buccal'
| 'rectal'
| 'subcutanious'
| 'im'
| 'iv'

/**
 * Different ROAs have different bioavailabilities thus require different dosages for comparable
 * effects and has a different duration timeline. These values are mostly stored in the DrugVariant
 * model.
 */
@Entity()
export class DrugRouteOfAdministration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => DrugVariant, (variant) => variant.roas, { cascade: true })
  variant: Promise<DrugVariant>;

  @Column('enum', {
    enum: [
      'oral',
      'insuffilated',
      'inhaled',
      'topical',
      'buccal',
      'rectal',
      'subcutanious',
      'im',
      'iv',
    ],
  })
  route: RouteOfAdministration;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
