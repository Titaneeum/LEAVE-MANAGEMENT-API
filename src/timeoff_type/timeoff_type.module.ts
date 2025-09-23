import { Module } from '@nestjs/common';
import { TimeoffTypeService } from './timeoff_type.service';
import { TimeoffTypeController } from './timeoff_type.controller';
import { TimeoffType } from './entities/timeoff_type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TimeoffType])],
  controllers: [TimeoffTypeController],
  providers: [TimeoffTypeService],
})
export class TimeoffTypeModule {}
