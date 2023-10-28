// exam.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { Exam } from './exam.entity';
import { Repository } from 'typeorm';
import { Answer } from 'src/answer/answer.entity';
import { Question } from 'src/question/question.entity';
import { ExamuserService } from 'src/examuser/examuser.service';

@Injectable()
export class ExamService {
  constructor(
    @Inject('EXAM_REPOSITORY')
    private examRepository: Repository<Exam>,
    private readonly examUserService: ExamuserService,
  ) {}

  async createExam(examData: Exam) {
    if (examData.numberOfQuestions !== examData.questions.length) {
      return {
        message: 'The number of questions does not match',
        statusCode: 400,
      };
    }
    if (!this.validateQuestion(examData.questions)) {
      return {
        message: 'Câu trả lời chỉ có một câu đúng',
        statusCode: 400,
      };
    }
    const exam = this.examRepository.create(examData);
    this.examRepository.save(exam);
    return {
      message: 'Create successfully!',
      statusCode: 200,
    };
  }
  async getDetailExam(examId: number) {
    const exam = await this.examRepository.findOneOrFail({ where: { examId } });
    console.log(exam.usersTook[0]);
    const listUserTookTheExam = await this.examUserService.findAllWithCondition(
      exam.examId,
    );
    const theNumberOfUser = listUserTookTheExam.length;
    console.log(listUserTookTheExam);
    let highestScore = listUserTookTheExam[0].score;
    let avg = 0;
    for (let i = 1; i < theNumberOfUser; i++) {
      avg += listUserTookTheExam[i].score;
      if (highestScore < listUserTookTheExam[i].score) {
        highestScore = listUserTookTheExam[i].score;
      }
    }
    avg = avg / theNumberOfUser;
    return {
      theNumberOfUser: theNumberOfUser,
      theHigestScore: highestScore,
      averageScore: avg,
    };
  }
  async getExams(): Promise<Exam[]> {
    return this.examRepository.find();
  }

  async getExamById(examId: number): Promise<Exam> {
    return this.examRepository.findOneOrFail({
      where: { examId },
    });
  }

  async updateExam(examId: number, updateData: Exam) {
    if (updateData.numberOfQuestions !== updateData.questions.length) {
      return {
        message: 'The number of questions does not match',
        statusCode: 400,
      };
    }
    if (!this.validateQuestion(updateData.questions)) {
      return {
        message: 'Câu trả lời chỉ có một câu đúng',
        statusCode: 400,
      };
    }
    const exam = await this.getExamById(examId);
    if (!exam) {
      return null;
    }
    Object.assign(exam, updateData);
    this.examRepository.save(exam);
    return {
      message: 'Update successfully!',
      statusCode: 200,
    };
  }

  async deleteExam(examId: number): Promise<void> {
    await this.examRepository.delete(examId);
  }
  validateQuestion(questions: Question[]): boolean {
    for (let i = 0; i < questions.length; i++) {
      if (!this.validateAnswer(questions[i].answers)) return false;
    }
    return true;
  }
  validateAnswer(answers: Answer[]): boolean {
    let count = 0;
    for (let i = 0; i < answers.length; i++) {
      if (answers[i].isCorrect) {
        count++;
        if (count >= 2) return false;
      }
    }
    if (count <= 0) return false;
    return true;
  }
}
