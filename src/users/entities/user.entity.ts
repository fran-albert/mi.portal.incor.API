import { City } from 'src/cities/entities/city.entity';
import { Role } from 'src/common/enums/role.enum';
import { Lab } from 'src/labs/entities/lab.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  lastname: string;

  @Column({ length: 8 })
  dni: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ length: 50 })
  healthInsurance: string;

  @Column({ length: 50 })
  phone: string;

  @ManyToOne(() => City, (city) => city.users, { nullable: false, eager: true })
  @JoinColumn({ name: 'idCity' })
  city: City;

  @Column({ nullable: false })
  birthDate: Date;

  @Column({ nullable: true})
  photo: string;

  @Column('simple-array')
  role: Role[];

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Lab, (lab) => lab.user, { eager: true })
  labs: Lab[];
}
