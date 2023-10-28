// exam.model.ts
import { ExamUser } from 'src/examuser/exam.user.entity';
import { Question } from 'src/question/question.entity';
import { User } from 'src/user/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Exam {
  @PrimaryGeneratedColumn()
  examId: number;

  @ManyToOne(() => User, (user) => user.exams)
  user: User;

  @Column()
  numberOfQuestions: number;

  @Column()
  timeLimit: number;

  @OneToMany(() => Question, (question) => question.exam, {
    eager: true,
    cascade: true,
  })
  questions: Question[];

  @OneToMany(() => ExamUser, (examUser) => examUser.exam, {
    eager: true,
    cascade: true,
  })
  usersTook: User[];
}
