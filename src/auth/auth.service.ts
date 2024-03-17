import { ConflictException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './dto/jwt-payload.interface';

@Injectable()
export class AuthService {
   
   private logger = new Logger('AuthService');
   constructor(
     @InjectRepository(User)private userRepository: Repository<User>,private jwtService: JwtService) {}


   async signUp(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}>
   {
    const {username, password} = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const user = new User();
    user.username = username;
    user.salt = salt;
    user.password = await this.hashPassword(password, salt);


    try{
      await this.userRepository.save(user);
      return this.signIn({ username, password} as AuthCredentialsDto)
    } catch (error)
    {
     if(error.code === 'ER_DUP_ENTRY')
     {
      throw new ConflictException('Username already exits');
     }
     else
     {
      console.log(error)
      throw new InternalServerErrorException();
     }
    }
   }

   async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}>
   {
     const username = await this.validateUserPassword(authCredentialsDto);
     if(!username)
     {
      throw new UnauthorizedException('Invalid credentials');
     }

     const payload: JwtPayload = { username };
     const accessToken = await this.jwtService.sign(payload);
     this.logger.debug(`Generated JWT Token with payload ${JSON.stringify(payload)}`)

     return {accessToken};
   }


   async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string>
   {
     const { username, password } = authCredentialsDto;
     const user = await this.userRepository.findOne({where:{username}});

     if(user && await user.validatePassword(password))
     {
      return user.username;
     }
     else
     {
      return null;
     }
   }
 

   private async hashPassword(password: string, salt: string): Promise<string>
   {
    return bcrypt.hash(password, salt);
   }

   
}
