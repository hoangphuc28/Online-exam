import { Body, Controller, Patch, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './DTO/user.dto';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Patch('active')
  activeAccount(
    @Body() user: UserDto,
    @Query('otp') otp: string,
  ): Promise<User> {
    return this.userService.activeAccount(user.username, otp);
  }
}
