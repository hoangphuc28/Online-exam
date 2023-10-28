import { DataSource } from 'typeorm';
import { Answer } from './answer.entity';

export const answerProviders = [
  {
    provide: 'ANSWER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Answer),
    inject: ['DATA_SOURCE'],
  },
];
