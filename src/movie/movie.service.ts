import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { CreateMovieInput } from '../graphql.schema';

@Injectable()
export class MovieService {
    constructor(
        @InjectRepository(Movie)
        private readonly movieRepository: Repository<Movie>) { }

    async create(movie: CreateMovieInput): Promise<Movie> {
        const movieEnt = await this.movieRepository.create(movie);
        return await this.movieRepository.save(movieEnt);
    }

    async findAll(): Promise<Movie[]> {
        return await this.movieRepository.find();
    }

    async findOneById(id: number): Promise<Movie> {
        const result = await this.movieRepository.find({ where: { id } });
        return result[0];
    }

    async findByName(name: string): Promise<Movie> {
        const result = await this.movieRepository.find({ where: { name } });
        return result[0];
    }
}
