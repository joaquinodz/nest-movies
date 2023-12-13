import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @Inject('MOVIE_REPOSITORY')
    private movieRepository: Repository<Movie>,
  ) {}

  async create(createMovieDto: Movie) {
    return this.movieRepository.save(createMovieDto);
  }

  findAll() {
    return this.movieRepository.find();
  }

  findOne(id: number) {
    return this.movieRepository.findOneBy({ id });
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    const result = await this.movieRepository.update(id, updateMovieDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Movie with id ${id} does not exist`);
    }
    return result;
  }

  async remove(id: number) {
    const result = await this.movieRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Movie with id ${id} does not exist`);
    }
    return result;
  }
}
