// src/entities/home.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserHomeEntity } from './user-home.entity';

@Entity('home')
export class HomeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255, unique: true })
    street_address: string;

    @Column({ length: 50, nullable: true })
    state: string;

    @Column({ length: 10, nullable: true })
    zip: string;

    @Column({ type: 'float', nullable: true })
    sqft: number;

    @Column({ type: 'int', nullable: true })
    beds: number;

    @Column({ type: 'int', nullable: true })
    baths: number;

    @Column({ type: 'float', nullable: true })
    list_price: number;

    @OneToMany(() => UserHomeEntity, userHome => userHome.home)
    userHomes: UserHomeEntity[];
}
