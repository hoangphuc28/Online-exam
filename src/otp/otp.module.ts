import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { otpProviders } from './otp.providers';
import { OtpService } from './otp.service';

@Module({
  imports: [DatabaseModule],
  providers: [...otpProviders, OtpService],
  controllers: [],
  exports: [OtpService],
})
export class OtpModule {}
