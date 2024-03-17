import { ApiProperty } from "@nestjs/swagger";
import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto
{
    
    @ApiProperty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;
    
    @ApiProperty()
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, 
    {message: 'Password too weak'},)
    password: string;
}