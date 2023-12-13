import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { moviesProviders } from './movies.providers';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [DatabaseModule, AuthModule, UsersModule],
  controllers: [MoviesController],
  providers: [...moviesProviders, MoviesService, JwtService],
})
export class MoviesModule {}
