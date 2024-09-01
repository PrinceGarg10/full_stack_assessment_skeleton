// src/entities/user-home.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '../../user/entity/user.entity';
import { HomeEntity } from './home.entity';

@Entity('home_user')
export class UserHomeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    home_id: number;

    @ManyToOne(() => UserEntity, user => user.userHomes)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @ManyToOne(() => HomeEntity, home => home.userHomes)
    @JoinColumn({ name: 'home_id' })
    home: HomeEntity;
}
