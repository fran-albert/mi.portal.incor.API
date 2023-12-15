import { User } from 'src/users/entities/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Lab {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.labs)
  @JoinColumn({ name: 'idPatient' })
  user: User;
  

  @Column()
  name: string;

  @Column()
  date: Date;

  @Column({
    default: () => `'${uuidv4()}'`,
  })
  file: string;

  @DeleteDateColumn()
  deletedAt: Date;
}
