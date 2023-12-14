import { City } from "src/cities/entities/city.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToOne(() => City, (city) => city.users, { nullable: false })
    @JoinColumn({ name: 'idCity' })
    city: City;
  
    @Column({ nullable: false })
    birthDate: Date;

    @Column()
    photo: string;
}
