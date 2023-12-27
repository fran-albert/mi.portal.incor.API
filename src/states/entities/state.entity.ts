import { City } from 'src/cities/entities/city.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class State {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  state: string;

  @OneToMany(() => City, (city) => city.state, {eager: true})
  cities: City[];  
}
