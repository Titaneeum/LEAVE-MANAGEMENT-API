import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimeOffRequestModule } from './time_off_request/time_off_request.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TimeoffTypeModule } from './timeoff_type/timeoff_type.module';
import { LeaveTypeModule } from './leave_type/leave_type.module';
import { RequestDraftModule } from './request_draft/request_draft.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // or postgres/sqlite/etc
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'leave-management',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false, // true only for dev
    }),
    TimeOffRequestModule,
    UserModule,
    AuthModule,
    LeaveTypeModule,
    TimeoffTypeModule,
    RequestDraftModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
