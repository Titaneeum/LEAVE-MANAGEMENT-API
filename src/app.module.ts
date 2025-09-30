import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { LeaveRequestModule } from './leave_request/leave_request.module';
import { LeaveBalanceModule } from './leave_balance/leave_balance.module';
import { UserLevelModule } from './user_level/user_level.module';
import { TimeOffRequestModule } from './time-off_request/time-off_request.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // or postgres/sqlite/etc
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'leave_management',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false, // true only for dev
    }),
    UserModule,
    AuthModule,
    TimeOffRequestModule,
    LeaveRequestModule,
    LeaveBalanceModule,
    UserLevelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
