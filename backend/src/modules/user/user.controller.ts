import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ) { }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto);
    }

    @Get('find-all')
    async findAll(@Query() query: any) {
        return await this.userService.findAll(query);
    }

    @Get()
    async findOne(@Query('id') id: number) {
        return await this.userService.findOne(id);
    }

}
