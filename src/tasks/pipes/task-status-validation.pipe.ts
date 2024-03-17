import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatusEnum } from '../enum/task-status.enum';


export class TaskStatusValidationPipe implements PipeTransform
{
    readonly allowedStatuses = [

        TaskStatusEnum.OPEN,
        TaskStatusEnum.IN_PROGRESS,
        TaskStatusEnum.DONE,
    ];
    
    transform(value: any)
    {
        // value = value.toUpperCase();

        // if(!this.isStatusValid(value))
        // {
        //     throw new BadRequestException(`"${value}"is an invalid status`);
        // }

        // return value;

        if(typeof value !== 'string')
        {
            throw new BadRequestException('Status must be a string')
        }
        value = value.toUpperCase();
       if(!this.isStatusValid(value))
       {
        throw new BadRequestException(`"${value}"is an invalid status`)
       }
       return value;
    }

    private isStatusValid(status: any)
    {
       const idx = this.allowedStatuses.indexOf(status);
       return idx !== -1;
    }
}