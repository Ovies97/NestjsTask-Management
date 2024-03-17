import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository, } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';
import { TaskStatusEnum } from './enum/task-status.enum';

@Injectable()
export class TasksService {
  private logger = new Logger('TaskRepository');

  constructor(@InjectRepository(Task) private taskRepository: Repository<Task>) {

  }


  //Get task method
  async getTasks(filterDto: GetTasksFilterDto, user: any): Promise<Task[]> {
    try {
      const { status, search } = filterDto;
      const query = this.taskRepository.createQueryBuilder('task')

      query.where('task.userId = :userId', { userId: user.id })

      if (status) {
        query.andWhere('task.status = :status', { status });
      }
      if (search) {
        query.andWhere('{task.title LIKE :search OR task.description LIKE :search}', { search: '%${search}%' });
      }

      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      this.logger.error(`Failed to get tasks for user "${user.username}", Filters: ${JSON.stringify(filterDto)}`, error.stack);
      throw new InternalServerErrorException();
    }
  }


  //Get Task By ID
  async getTaskById(id: number, user: any,): Promise<Task> {
    const found = await this.taskRepository.findOne({ where: { id, userId: user.id } });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);

    }
    return found;
  }


  // Create task method
  async createtask(createTaskDto: CreateTaskDto, user: any): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatusEnum.OPEN;
    task.userId = user.id

    try {
      await task.save();
    } catch (error) {
      this.logger.error(`Failed to create a task for user "${user.username}". Data: ${createTaskDto}`, error.stack)
      throw new InternalServerErrorException();
    }
    task.user = user;
    delete task.user;

    return this.taskRepository.save(task);
  }

  // Delete task method
  async deleteTask(id: number, user: any,): Promise<void> {
    const result = await this.taskRepository.delete({ id, userId: user.id });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }


  // Update task method
  async updateTaskStatus(id: number, status: TaskStatusEnum, user: any,): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await task.save();
    return task;
  }

}
