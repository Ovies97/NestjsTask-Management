import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

private users = [];

getAllUsers()
{
    return this.users;
}

}
