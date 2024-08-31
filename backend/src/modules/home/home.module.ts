import { Module } from '@nestjs/common';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeEntity } from './entity/home.entity';
import { UserHomeEntity } from './entity/user-home.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([HomeEntity, UserHomeEntity])
  ],
  controllers: [HomeController],
  providers: [HomeService],
  exports: [HomeService]

})
export class HomeModule { }
