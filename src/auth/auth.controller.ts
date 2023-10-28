import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from 'src/user/DTO/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  createUser(@Body() createUserDto: UserDto) {
    const res = this.authService.create(createUserDto);
    return res;
  }
  @Post('login')
  loginUser(@Body() user: UserDto) {
    return this.authService.login(user.username, user.password);
  }
}
