import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/auth/user.entity';

@Controller('user')
export class UserController {

    constructor( private userService: UserService){}
    

    @Get()
    getAllUsers()
    {
     return this.userService.getAllUsers();
    }

    createTask(title: string, description: string)
    {
    }
}
