import { BadRequestException, Injectable } from '@nestjs/common';
import { HomeEntity } from './entity/home.entity';
import { CreateHomeDto } from './dto/create-home.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserHomeEntity } from './entity/user-home.entity';
import { UserEntity } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class HomeService {
    constructor(
        @InjectRepository(HomeEntity)
        private readonly homeRepository: Repository<HomeEntity>,
        @InjectRepository(UserHomeEntity)
        private readonly userHomeRepository: Repository<UserHomeEntity>,
        private readonly userService: UserService
    ) { }


    async create(data: CreateHomeDto) {
        try {
            try {
                const createHome = await this.homeRepository.create(data)
                return createHome
            } catch (e) {
                throw new BadRequestException(e)
            }
        } catch (e) {
            throw new BadRequestException(e)
        }
    }


    async findByUser(userId: number): Promise<HomeEntity[]> {
        const userHomes = await this.userHomeRepository.find({ where: { user_id: userId }, relations: ['home'] });
        return userHomes.map(userHome => userHome.home);
    }

    async findByHome(homeId: number): Promise<UserEntity[]> {
        const homeUsers = await this.userHomeRepository.find({ where: { home_id: homeId }, relations: ['user'] });
        return homeUsers.map(userHome => userHome.user);
    }

    async updateUsers(homeId: number, userIds: number[]): Promise<any> {
        // Validate home existence
        const home = await this.homeRepository.findOneBy({ id: homeId });
        if (!home) {
            throw new BadRequestException('Home not found');
        }

        // Validate user existence
        const users = await this.userService.findUserByIds(userIds);
        if (users.length !== userIds.length) {
            throw new BadRequestException('One or more users not found');
        }

        // Remove all existing user-home relationships for this home
        await this.userHomeRepository.delete({ home_id: homeId });

        // Add new user-home relationships
        const userHomes = userIds.map(userId => {
            const userHome = new UserHomeEntity();
            userHome.user_id = userId;
            userHome.home_id = homeId;
            return userHome;
        });

        const saveData = await this.userHomeRepository.save(userHomes);
        return saveData
    }

}
