import { Module } from '@nestjs/common';
import { ExaminationModule } from 'src/examination/examination.module';
import { SocketService } from './socket.service';
import { AnswerModule } from 'src/answer/answer.module';
import { ExamuserModule } from 'src/examuser/examuser.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [ExaminationModule, AnswerModule, ExamuserModule, UserModule],
  providers: [SocketService],
})
export class SocketModule {}
