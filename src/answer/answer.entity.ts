// answer.model.ts
import { Exclude } from 'class-transformer';
import { Question } from 'src/question/question.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  answerId: number;

  @ManyToOne(() => Question, (question) => question.answers)
  question: Question;

  @Column()
  content: string;

  @Column()
  @Exclude()
  isCorrect: boolean;
}
