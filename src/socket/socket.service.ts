// socket.service.ts
import {
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { AnswerService } from 'src/answer/answer.service';
import { ExamService } from 'src/examination/examination.service';
import { ExamuserService } from 'src/examuser/examuser.service';
import { UserService } from 'src/user/user.service';
@WebSocketGateway(8080)
export class SocketService implements OnGatewayDisconnect {
  private connectedClients = new Map();
  constructor(
    private readonly examService: ExamService,
    private readonly answerService: AnswerService,
    private readonly examUserService: ExamuserService,
    private readonly useService: UserService,
  ) {}

  @WebSocketServer()
  handleDisconnect(client: any) {
    const clientId = client.id;
    this.connectedClients.delete(clientId);
    console.log(
      'Số lượng người dùng đang truy cập: ' + this.connectedClients.size,
    );
  }
  @SubscribeMessage('startExam')
  async handleStartExam(client: any, data: any) {
    console.log(`Client connected: ${data.userId}}`);
    this.connectedClients.set(data.userId, 0);
    console.log(
      'Số lượng người dùng đang truy cập: ' + this.connectedClients.size,
    );
    const exams = await this.examService.getExamById(data.examId);
    const jsonData = JSON.stringify(exams);
    client.emit('start', jsonData);
  }
  @SubscribeMessage('checkAnswer')
  async handleSubmitAnswer(client: any, data: any) {
    const answer = await this.answerService.getById(data.answerId);
    console.log(answer);
    if (answer.isCorrect) {
      this.connectedClients.set(
        data.userId,
        this.connectedClients.get(data.usreId) + 1,
      );
    }
    client.emit('checkAnswer', answer.isCorrect);
  }
  @SubscribeMessage('finishExam')
  async handleFinishExam(client: any, data: any) {
    const totalQuestion = await this.examService.getExamById(data.examId);
    const score =
      this.connectedClients.get(data.userId) / totalQuestion.numberOfQuestions;
    const user = await this.useService.findOne(data.userId);
    const exam = await this.examService.getExamById(data.examId);
    this.examUserService.create(user, exam, score);
    client.emit('finishExam', score);

    // Xử lý khi bài thi kết thúc hoặc hết thời gian
  }
}
