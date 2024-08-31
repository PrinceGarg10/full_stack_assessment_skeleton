import * as Joi from 'joi';

import { Service } from '../../tokens';
import { Config } from '../model';
import * as dotenv from 'dotenv'

export const configProvider = {

    provide: Service.CONFIG,
    useFactory: (): Config => {
        dotenv.config()
        const env = process.env;
        const validationSchema = Joi.object().unknown().keys({
            API_PORT: Joi.string().required(),
            API_PREFIX: Joi.string().required(),
        });

        const result = validationSchema.validate(env);

        if (result.error) {
            throw new Error('Configuration not valid: ' + result.error.message);
        }

        return {
            API_PORT: Number(env.API_PORT),
            API_PREFIX: `${env.API_PREFIX}`,
            typeOrmConfig: {
                type: 'mysql',
                host: `${env.MYSQL_HOST}`,
                port: Number(`${env.MYSQL_PORT}` || 3306),
                username: `${env.MYSQL_USERNAME}`,
                password: `${env.MYSQL_PASSWORD}`,
                database: `${env.MYSQL_DATABASE}`,
                synchronize: true
            },

        };
    }
};