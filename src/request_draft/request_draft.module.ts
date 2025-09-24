import { Module, Req } from '@nestjs/common';
import { RequestDraftService } from './request_draft.service';
import { RequestDraftController } from './request_draft.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestDraft } from './entities/request_draft.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RequestDraft])],
  controllers: [RequestDraftController],
  providers: [RequestDraftService],
})
export class RequestDraftModule {}
