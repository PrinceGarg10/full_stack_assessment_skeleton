import { Module } from '@nestjs/common';
import { CommonModule, Config } from './common';
import { Service } from './tokens';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from './user/entity/user.entity';
import { HomeEntity } from './home/entity/home.entity';
import { UserHomeEntity } from './home/entity/user-home.entity';
import { HomeModule } from './home/home.module';

@Module({
    imports: [
        CommonModule,
        TypeOrmModule.forRootAsync({
            imports: [CommonModule],
            inject: [Service.CONFIG],
            useFactory: (config: Config): TypeOrmModuleOptions => {
                return {
                    ...config.typeOrmConfig,
                    entities: [UserEntity, HomeEntity, UserHomeEntity]
                }
            },
        }),
        UserModule,
        HomeModule
    ],
    providers: [AppService],
    controllers: [AppController]
})
export class ApplicationModule { }
