// src/users/user.entity.ts
import { User } from 'src/user/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

@Entity()
export class Otp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  expire: Date;

  @OneToOne(() => User, (user) => user.otp)
  user: User;
}
