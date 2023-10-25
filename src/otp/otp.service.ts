import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Otp } from './otp.entity';
import * as crypto from 'crypto';

@Injectable()
export class OtpService {
  constructor(
    @Inject('OTP_REPOSITORY')
    private otpRepository: Repository<Otp>,
  ) {}
  async createOtp(): Promise<Otp> {
    const otp = new Otp();
    otp.code = this.generateOTP(6);
    otp.expire = new Date();
    return this.otpRepository.save(otp);
  }
  async deleteOtp(otp: Otp) {
    console.log(otp);
    this.otpRepository.delete(otp.id);
  }
  generateOTP(length: number): string {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = crypto.randomInt(0, digits.length);
      otp += digits[randomIndex];
    }
    return otp;
  }
}
