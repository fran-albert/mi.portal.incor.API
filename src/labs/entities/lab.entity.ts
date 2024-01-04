import { DataLab } from 'src/data-labs/entities/data-lab.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Lab {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.labs, { nullable: false })
  @JoinColumn({ name: 'idPatient' })
  user: User;

  @OneToOne(() => DataLab, (datalab) => datalab.lab, { eager: true })
  datalab: DataLab;

  @Column()
  name: string;

  @Column()
  date: Date;

  @Column()
  file: string;

  @DeleteDateColumn()
  deletedAt: Date;
}
