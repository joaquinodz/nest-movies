import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { userProviders } from './users.providers';
import { DatabaseModule } from 'src/database/database.module';
import { UsersController } from './users.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...userProviders, JwtService, UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
