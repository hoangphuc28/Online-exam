import { Module } from '@nestjs/common';
import { ExamuserService } from './examuser.service';
import { examUserProviders } from './exam.user.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...examUserProviders, ExamuserService],
  exports: [ExamuserService],
})
export class ExamuserModule {}
