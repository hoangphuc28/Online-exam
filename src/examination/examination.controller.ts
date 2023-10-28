// exam.controller.ts
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ExamService } from './examination.service';
import { Exam } from './exam.entity';
import { classToPlain } from 'class-transformer';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { Headers } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
@Controller('exams')
export class ExamController {
  constructor(
    private readonly examService: ExamService,
    private readonly authService: AuthService,
    private readonly usrService: UserService,
  ) {}
  @UseGuards(AuthGuard)
  @Post()
  async createExam(@Headers() headers, @Body() examData: Exam) {
    const payload = await this.authService.refreshTokenByOldToken(
      headers.authorization,
    );
    const user = await this.usrService.findOne(payload);
    examData.user = user;
    return this.examService.createExam(examData);
  }
  @UseGuards(AuthGuard)
  @Get()
  getExams() {
    const exams = this.examService.getExams();
    const answerJson = classToPlain(exams);
    return answerJson;
  }

  @Get(':examId')
  getExam(@Param('examId') examId: number) {
    return this.examService.getExamById(examId);
  }
  @Get('detail/:examId')
  getDetailExam(@Param('examId') examId: number) {
    return this.examService.getDetailExam(examId);
  }
  @Put(':examId')
  updateExam(@Param('examId') examId: number, @Body() updateData: Exam) {
    return this.examService.updateExam(examId, updateData);
  }

  @Delete(':examId')
  deleteExam(@Param('examId') examId: number) {
    return this.examService.deleteExam(examId);
  }
}
