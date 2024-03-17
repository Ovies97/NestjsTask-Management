import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Console } from 'console';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { TaskUpdateDto } from './dto/update-task-status.dto';


@ApiTags('tasks')
@ApiBearerAuth()
@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {

  private logger = new Logger('TasksController');
  constructor(private tasksService: TasksService) { }

  @Get()
  getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto, @Req() req: any): Promise<Task[]> {
    const user: User = req.user;
    this.logger.verbose(`User "${user.username}"retrieving all tasks. Filters: ${JSON.stringify(filterDto)}`);
    return this.tasksService.getTasks(filterDto, user);
  }


  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number, @Req() req: any,): Promise<Task> {
    const user: User = req.user;
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto, @Req() req: any): Promise<Task> {
    const user: User = req.user;
    this.logger.verbose(`User "${user.username}" creating a new task. Data: ${JSON.stringify(createTaskDto)}`)
    return this.tasksService.createtask(createTaskDto, user);
  }



  @Delete('/:id')
  deleteTask(@Param('id', ParseIntPipe,) id: number, @Req() req: any,): Promise<void> {
    const user: User = req.user;
    return this.tasksService.deleteTask(id, user);
  }


   
  @Patch('/:id/status')
  updateTaskStatus(@Param('id', ParseIntPipe) id: number,
    @Body() taskUpdateDto: TaskUpdateDto, @Req() req: any): Promise<Task> {
    const user: User = req.user;
    return this.tasksService.updateTaskStatus(id, taskUpdateDto.status, user);
  }

}
