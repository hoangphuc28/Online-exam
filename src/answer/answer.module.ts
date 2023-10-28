import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { DatabaseModule } from 'src/database/database.module';
import { answerProviders } from './answer.providers';
import { AnswerController } from './answer.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...answerProviders, AnswerService],
  controllers: [AnswerController],
  exports: [AnswerService],
})
export class AnswerModule {}
