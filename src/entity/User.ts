import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BeforeInsert,
} from 'typeorm';
import argon2 from 'argon2';

type UserRole = 'user'
| 'alumini'
| 'contributor'
| 'tripsitter'
| 'moderator'
| 'operator';

const roleOrder: UserRole[] = [
  'user',
  'alumini',
  'contributor',
  'tripsitter',
  'moderator',
  'operator',
];

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('varchar', {
    unique: true,
    length: 50,
  })
  nick: string;

  @Column('char', {
    unique: true,
    length: 32,
    nullable: true,
  })
  discordId: string;

  @Column('varchar', {
    unique: true,
    length: 320,
    nullable: true,
  })
  email: string;

  @Column('char', { length: 60 })
  password: string;

  @Column('enum', {
    enum: roleOrder,
    default: 'user',
  })
  role: UserRole;

  @Column('boolean', { default: false })
  banned: boolean;

  @Column('timestamp')
  lastActive: Date;

  @CreateDateColumn()
  createdAt: Date;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await argon2.hash(this.password);
  }

  async authorize(password: string): Promise<boolean> {
    return argon2.verify(this.password, password);
  }

  hasPriviledge(role: UserRole): boolean {
    return roleOrder.indexOf(this.role) >= roleOrder.indexOf(role);
  }
}
