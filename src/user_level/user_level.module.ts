import { Module } from '@nestjs/common';
import { UserLevelService } from './user_level.service';
import { UserLevelController } from './user_level.controller';
import { UserLevel } from './entities/user_level.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserLevel])],
  controllers: [UserLevelController],
  providers: [UserLevelService],
})
export class UserLevelModule {}
