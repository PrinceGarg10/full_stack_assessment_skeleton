import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntity } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }

    getUniqueUsername(user: CreateUserDto): string {

        const username = user.username || user.email?.split('@')[0]
        return username;
    }

    async create(data: CreateUserDto) {
        try {
            data.username = this.getUniqueUsername(data)
            try {
                const createUser = await this.userRepository.create(data)
                return createUser
            } catch (e) {
                throw new BadRequestException(e)
            }
        } catch (e) {
            throw new BadRequestException(e)
        }
    }

    async findOne(id: number): Promise<any | null> {
        try {
            const user = await this.userRepository.findOneBy({ id })
            return user
        }
        catch (e) {
            throw new BadRequestException(e)
        }
    }


    async findUserByIds(userIds: number[]): Promise<any> {
        return await this.userRepository.find({ where: { id: In(userIds) } })
    }

    async findAll(data: any): Promise<any> {
        try {
            const filter: any = {}
            const user = await this.userRepository.find(filter)
            return user;
        }
        catch (e) {
            throw new BadRequestException(e)
        }
    }

}
