// src/users/dto/user.dto.ts
import { IsString, IsEmail, IsNotEmpty, IsDate } from 'class-validator';

export class UserDto {
  @IsEmail()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsDate()
  birthdate: Date;
}
