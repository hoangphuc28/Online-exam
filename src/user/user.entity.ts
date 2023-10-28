// src/users/user.entity.ts
import { Exam } from 'src/examination/exam.entity';
import { ExamUser } from 'src/examuser/exam.user.entity';
import { Otp } from 'src/otp/otp.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  Unique,
  OneToMany,
} from 'typeorm';

@Entity()
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  fullName: string;

  @Column()
  gender: string;

  @Column()
  birthdate: Date;

  @Column()
  key: string;

  @Column()
  active: boolean;

  @OneToOne(() => Otp, (otp) => otp.user, { onDelete: 'SET NULL', eager: true })
  @JoinColumn()
  otp: Otp;

  @OneToMany(() => Exam, (exam) => exam.user, {
    onDelete: 'SET NULL',
    eager: true,
  })
  @JoinColumn()
  exams: Exam[];

  @OneToMany(() => ExamUser, (examUser) => examUser.user)
  examsTook: Exam[];
}
