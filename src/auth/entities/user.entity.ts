import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Manager } from '../../managers/entities/manager.entity';
import { Employee } from '../../employees/entities/employee.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column('text', {
  unique: true,
  })
  userEmail: string;

  @Column('text')
  userPassword: string;
  @Column('simple-array', {
    default: ["Employee"]
  })
  userRoles: string[];

  @OneToOne(() => Manager)
  manager: Manager;
  eager: true

  @OneToOne(() => Employee)
  employee: Employee;

}