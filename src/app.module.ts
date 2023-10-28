import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { OtpModule } from './otp/otp.module';
import { ExaminationModule } from './examination/examination.module';
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';
import { AuthModule } from './auth/auth.module';
import { SocketModule } from './socket/socket.module';
import { ExamuserModule } from './examuser/examuser.module';

@Module({
  imports: [
    UserModule,
    OtpModule,
    ExaminationModule,
    QuestionModule,
    AnswerModule,
    AuthModule,
    SocketModule,
    ExamuserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
