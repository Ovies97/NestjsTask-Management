import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {Strategy, ExtractJwt} from 'passport-jwt';
import { JwtPayload } from './dto/jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as config from 'config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy)
{
 
 constructor(@InjectRepository(User)private userRepository: Repository<User>,)
 {
    super({jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: process.env.JWT_SECRET,})
 }

 async validate(payload: JwtPayload)
 {
    const { username} = payload;
    const user = await this.userRepository.findOne({where: {username} });

    if(!user)
    {
        throw new UnauthorizedException();
    }

    return user;
 }
}