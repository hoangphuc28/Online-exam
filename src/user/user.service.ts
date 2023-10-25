import { HttpException, Inject, Injectable } from '@nestjs/common';
import { QueryFailedError, Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './DTO/user.dto';
import { AuthService } from './auth.service';
import * as crypto from 'crypto';
import { OtpService } from 'src/otp/otp.service';
import { EmailService } from './email.service';
@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private otpService: OtpService,
    private authService: AuthService,
    private emailService: EmailService,
  ) {}
  async create(createUserDto: UserDto) {
    const md5Hash = crypto
      .createHash('md5')
      .update(createUserDto.password)
      .digest('hex');
    const user = new User();
    user.username = createUserDto.username;
    user.password = md5Hash;
    user.fullName = createUserDto.fullName;
    user.gender = createUserDto.gender;
    user.birthdate = createUserDto.birthdate;
    const key = crypto.randomBytes(32).toString('utf8');
    user.key = key;
    user.active = false;
    user.otp = await this.otpService.createOtp();
    try {
      await this.userRepository.save(user);
      setTimeout(async () => {
        await this.otpService.deleteOtp(user.otp);
      }, 600000);
      this.emailService.sendEmail(
        user.username,
        'Verify account',
        user.otp.code,
        'Your Otp:' + user.otp.code,
      );
    } catch (err) {
      if (err instanceof QueryFailedError) {
        return { message: 'Email already exists', statusCode: 400 };
      } else {
        return { message: 'An error occurred', statusCode: 500 };
      }
    }
  }
  async login(username: string, password: string): Promise<User> {
    const user = await this.userRepository.findOneOrFail({
      where: { username: username },
    });
    if (!user.active) {
      throw new HttpException('Account has not been actived', 400);
    }
    const md5Hash = crypto.createHash('md5').update(password).digest('hex');
    if (md5Hash === user.password) {
      return user;
    } else {
      throw new HttpException('Password does not correct', 400);
    }
  }
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOneOrFail({ where: { id } });
  }
  async activeAccount(username: string, otp: string): Promise<User> {
    const user = await this.userRepository.findOneOrFail({
      where: { username },
    });
    console.log(user);
    if (user.otp.code == otp) {
      user.active = true;
      this.otpService.deleteOtp(user.otp);
    }
    return this.userRepository.save(user);
  }
}
