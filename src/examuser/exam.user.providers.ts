import { DataSource } from 'typeorm';
import { ExamUser } from './exam.user.entity';

export const examUserProviders = [
  {
    provide: 'EXAMUSER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ExamUser),
    inject: ['DATA_SOURCE'],
  },
];
