import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ExamUser } from './exam.user.entity';
import { Exam } from 'src/examination/exam.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class ExamuserService {
  constructor(
    @Inject('EXAMUSER_REPOSITORY')
    private examUserRepository: Repository<ExamUser>,
  ) {}
  async findAllWithCondition(examid: number): Promise<ExamUser[]> {
    const res = await this.examUserRepository
      .createQueryBuilder('exam_user')
      .where(`examExamId = :examid`, { examid })
      .getMany();
    return res;
  }

  findOneByExam(exam: Exam) {
    return this.examUserRepository.find({ where: { exam } });
  }

  create(user: User, exam: Exam, score: number) {
    const examUser = new ExamUser();
    examUser.user = user;
    examUser.exam = exam;
    examUser.score = score;
    const res = this.examUserRepository.create(examUser);
    return this.examUserRepository.save(res);
  }

  //   update(id: number, updateExamUserDto: UpdateExamUserDto) {
  //     return this.examUserRepository.update(id, updateExamUserDto);
  //   }

  remove(id: number) {
    return this.examUserRepository.delete(id);
  }
}
