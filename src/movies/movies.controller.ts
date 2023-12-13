import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { UpdateMovieDto } from './dto/update-movie.dto';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { HasRoles } from 'src/auth/roles/roles.decorator';
import { UserRole } from 'src/users/roles';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { DatabaseExceptionInterceptor } from 'src/database/database.error.interceptor';
import { Movie } from './entities/movie.entity';

@ApiTags('Movies')
@ApiForbiddenResponse({
  description: 'The user has an invalid, missing, or expired token',
})
@ApiUnauthorizedResponse({
  description:
    'The user does not have the necessary permissions to access this resource',
})
@UseFilters(DatabaseExceptionInterceptor)
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @ApiBearerAuth()
  @HasRoles(UserRole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  create(@Body() createMovieDto: Movie) {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @ApiBearerAuth()
  @HasRoles(UserRole.ADMIN, UserRole.USER)
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(+id);
  }

  @ApiBearerAuth()
  @HasRoles(UserRole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(+id, updateMovieDto);
  }

  @ApiBearerAuth()
  @HasRoles(UserRole.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.remove(+id);
  }
}
