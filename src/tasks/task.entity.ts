import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/auth/user.entity";
import { TaskStatusEnum } from "./enum/task-status.enum";


@Entity()
export class Task extends BaseEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatusEnum;

    
     user: User;

     @Column()
     userId: number;
}