import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as config from 'config';
import 'dotenv/config';

export const typeOrmConfig: TypeOrmModuleAsyncOptions =
{
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
                type:'mysql',
                host:configService.get('RDS_HOSTNAME'),
                port: +configService.get('RDS_PORT'),
                username:configService.get('RDS_USERNAME'),
                password:configService.get('RDS_PASSWORD'),
                database:configService.get('RDS_DB_NAME'),
                autoLoadEntities: true,
                // entities:[__dirname + '/../**/*.entity{.js, .ts}'],
                synchronize: true,
        })
}