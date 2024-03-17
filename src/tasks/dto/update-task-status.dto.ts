import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { TaskStatusEnum } from "../enum/task-status.enum";

export class TaskUpdateDto
{
    @ApiProperty()
    @IsEnum(TaskStatusEnum)
    status: TaskStatusEnum;
}
