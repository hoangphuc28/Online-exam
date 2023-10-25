import { Body, Controller, Patch, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './DTO/user.dto';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  createUser(@Body() createUserDto: UserDto) {
    const res = this.userService.create(createUserDto);
    return res;
  }
  @Post('login')
  loginUser(@Body() user: UserDto): Promise<User> {
    return this.userService.login(user.username, user.password);
  }
  @Patch('active')
  activeAccount(
    @Body() user: UserDto,
    @Query('otp') otp: string,
  ): Promise<User> {
    return this.userService.activeAccount(user.username, otp);
  }
}
