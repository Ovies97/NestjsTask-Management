
import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatusEnum } from '../enum/task-status.enum';

export class GetTasksFilterDto
{
    @IsOptional()
    @IsIn([TaskStatusEnum.OPEN, TaskStatusEnum.IN_PROGRESS, TaskStatusEnum.DONE])
    status: TaskStatusEnum;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}