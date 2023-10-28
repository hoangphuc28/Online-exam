// question.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { Question } from './question.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionService {
  constructor(
    @Inject('QUESTION_REPOSITORY')
    private questionRepository: Repository<Question>,
  ) {}

  async createQuestion(questionData: Partial<Question>): Promise<Question> {
    const question = this.questionRepository.create(questionData);
    return this.questionRepository.save(question);
  }

  async getQuestions(): Promise<Question[]> {
    return this.questionRepository.find();
  }

  async getQuestionById(questionId: number): Promise<Question> {
    return this.questionRepository.findOne({ where: { questionId } });
  }

  async updateQuestion(
    questionId: number,
    updateData: Partial<Question>,
  ): Promise<Question> {
    const question = await this.getQuestionById(questionId);
    if (!question) {
      return null;
    }
    Object.assign(question, updateData);
    return this.questionRepository.save(question);
  }

  async deleteQuestion(questionId: number): Promise<void> {
    await this.questionRepository.delete(questionId);
  }
}
