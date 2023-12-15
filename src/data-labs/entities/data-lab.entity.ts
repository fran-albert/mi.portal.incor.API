import { Lab } from 'src/labs/entities/lab.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class DataLab {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Lab, { nullable: false })
  @JoinColumn({ name: 'idLab' })
  lab: Lab;

  @Column()
  ldh: string;

  @Column()
  lonogramaSangre: string;

  @Column()
  colesterolHdl: string;

  @Column()
  colesterolLdl: string;

  @Column()
  trigliceridos: string;

  @Column()
  uricemia: string;

  @Column()
  bilirrubina: string;

  @Column()
  colinesterasaSerica: string;

  @Column()
  gammaGlutamil: string;

  @Column()
  t4Libre: string;

  @Column()
  otros: string;
}
