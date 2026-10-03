import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import { Location } from '../../locations/entities/location.entity';
import { User } from '../../auth/entities/user.entity';

@Entity()
export class Employee {

  @PrimaryGeneratedColumn('uuid')
  employeeId: string;
  @Column('text')
  name: string;
  @Column('text')
  employeeLastName: string;
  @Column('text')
  employeePhoneNumber: string;
  @Column('text' , {
    unique: true
  })
  employeeEmail: string;
  @Column({
    type: 'text',
    nullable: true
  })
  photoURL: string

  @ManyToOne(() =>Location, (location) => location.employess)
  @JoinColumn({
    name: "locationId"
  })
  location: Location;

  @OneToOne(() => User)
  @JoinColumn({
   name: "userId"
  })
  user: User;
}
