import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmConfig),
    TasksModule,
    AuthModule
  ],
})
export class AppModule { }
