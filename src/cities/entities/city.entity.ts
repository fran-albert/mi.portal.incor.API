import { State } from 'src/states/entities/state.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idState: number;

  @Column()
  city: string;

  @OneToMany(() => User, user => user.city)
  users: User[];

  @ManyToOne(() => State, (state) => state.id)
  @JoinColumn({ name: 'idState' })
  state: State;
}
