import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { questionProviders } from './question.providers';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...questionProviders, QuestionService],
  controllers: [QuestionController],
})
export class QuestionModule {}
