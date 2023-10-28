import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { examProviders } from './exam.providers';
import { ExamService } from './examination.service';
import { ExamController } from './examination.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { ExamuserModule } from 'src/examuser/examuser.module';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule, ExamuserModule],
  providers: [...examProviders, ExamService],
  controllers: [ExamController],
  exports: [ExamService],
})
export class ExaminationModule {}
