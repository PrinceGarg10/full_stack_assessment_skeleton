import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserHomeEntity } from '../../home/entity/user-home.entity';
// import { UserHome } from '../user-home/user-home.entity';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @OneToMany(() => UserHomeEntity, userHome => userHome.user)
    userHomes: UserHomeEntity[];
}
