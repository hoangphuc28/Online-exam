import { Inject, Injectable } from '@nestjs/common';
import { Answer } from './answer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnswerService {
  constructor(
    @Inject('ANSWER_REPOSITORY')
    private answersRepository: Repository<Answer>,
  ) {}
  async getById(answerId: number): Promise<Answer> {
    return this.answersRepository.findOne({ where: { answerId } });
  }
}
