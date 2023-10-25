import { DataSource } from 'typeorm';
import { Otp } from './otp.entity';

export const otpProviders = [
  {
    provide: 'OTP_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Otp),
    inject: ['DATA_SOURCE'],
  },
];
