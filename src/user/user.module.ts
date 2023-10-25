import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from './user.providers';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { OtpModule } from 'src/otp/otp.module';
import { EmailService } from './email.service';

@Module({
  imports: [DatabaseModule, OtpModule],
  providers: [...userProviders, UserService, AuthService, EmailService],
  controllers: [UserController],
})
export class UserModule {}
