import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export interface Config {

    readonly API_PORT: number;

    readonly API_PREFIX: string;

    readonly typeOrmConfig: TypeOrmModuleOptions
}
