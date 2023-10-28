import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/user/DTO/user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: UserDto) {
    return this.userService.create(createUserDto);
  }
  async login(username: string, password: string) {
    const res = await this.userService.login(username, password);
    if ('id' in res) {
      const payload = { sub: res.id, username: res.username };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
    return res;
  }

  async refreshTokenByOldToken(authHeader: string) {
    type PayloadType = {
      sub: number;
      username: string;
    };
    const decodedJwt = this.jwtService.decode(
      authHeader.split(' ')[1],
    ) as PayloadType;
    return decodedJwt.sub;
  }
}
