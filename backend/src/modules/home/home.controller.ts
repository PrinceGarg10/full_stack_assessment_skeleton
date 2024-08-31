import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { HomeService } from './home.service';
import { CreateHomeDto } from './dto/create-home.dto';
import { HomeEntity } from './entity/home.entity';
import { UserEntity } from '../user/entity/user.entity';

@Controller('home')
export class HomeController {
    constructor(
        private homeService: HomeService
    ) { }

    @Post()
    async create(@Body() createHomeDto: CreateHomeDto) {
        return await this.homeService.create(createHomeDto);
    }

    @Get('find-by-user')
    async findByUser(@Query() query: any): Promise<any> {
        return this.homeService.findByUser(query);
    }

    @Get('find-by-home')
    async findByHome(@Query('homeId') homeId: number): Promise<UserEntity[]> {
        return this.homeService.findByHome(homeId);
    }

    @Patch('update-users')
    async updateUsers(@Body() updateUsersDto: { homeId: number; userIds: number[] }): Promise<void> {
        return this.homeService.updateUsers(updateUsersDto.homeId, updateUsersDto.userIds);
    }

}
