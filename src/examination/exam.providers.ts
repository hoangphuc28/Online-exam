import { DataSource } from 'typeorm';
import { Exam } from './exam.entity';

export const examProviders = [
  {
    provide: 'EXAM_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Exam),
    inject: ['DATA_SOURCE'],
  },
];
