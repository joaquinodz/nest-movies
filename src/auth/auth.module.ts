import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        isGlobal: true,
        secret: configService.getOrThrow<string>('JWT_SECRET'),
        signOptions: { expiresIn: '5m' },
      }),
    }),
  ],
  providers: [AuthService, JwtService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
