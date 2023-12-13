import { PartialType } from '@nestjs/swagger';
import { Movie } from '../entities/movie.entity';

export class UpdateMovieDto extends PartialType(Movie) {}
