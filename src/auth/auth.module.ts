import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '5m' },
    }),
  ],
  providers: [AuthService, JwtService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
