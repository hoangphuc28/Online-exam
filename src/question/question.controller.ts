// question.controller.ts
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { Question } from './question.entity';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  createQuestion(@Body() questionData: Partial<Question>) {
    return this.questionService.createQuestion(questionData);
  }

  @Get()
  getQuestions() {
    return this.questionService.getQuestions();
  }

  @Get(':questionId')
  getQuestion(@Param('questionId') questionId: number) {
    return this.questionService.getQuestionById(questionId);
  }

  @Put(':questionId')
  updateQuestion(
    @Param('questionId') questionId: number,
    @Body() updateData: Partial<Question>,
  ) {
    return this.questionService.updateQuestion(questionId, updateData);
  }

  @Delete(':questionId')
  deleteQuestion(@Param('questionId') questionId: number) {
    return this.questionService.deleteQuestion(questionId);
  }
}
