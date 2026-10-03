import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Manager } from '../../managers/entities/manager.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column('text')
  userEmail: string;

  @Column('text')
  userPassword: string;
  @Column('simple-array', {
    default: ["Employee"]
  })
  userRoles: string[];

  @OneToOne(() => Manager)
  manager: Manager
}