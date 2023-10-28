// role.entity.ts
import { Exam } from 'src/examination/exam.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ExamUser {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => User, (user) => user.examsTook)
  public user: User;

  @ManyToOne(() => Exam, (exam) => exam.usersTook)
  public exam: Exam;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column()
  score: number;
}
