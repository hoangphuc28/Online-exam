// question.model.ts
import { Answer } from 'src/answer/answer.entity';
import { Exam } from 'src/examination/exam.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  questionId: number;

  @ManyToOne(() => Exam, (exam) => exam.questions)
  exam: Exam;

  @Column()
  content: string;

  @OneToMany(() => Answer, (answer) => answer.question, {
    eager: true,
    cascade: true,
  })
  answers: Answer[];
}
