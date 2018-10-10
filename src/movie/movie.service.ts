import { Injectable, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ObjectID } from 'typeorm';
import { Movie } from './movie.entity';
import { CreateMovieInput } from '../graphql.schema';
import { IService } from 'common/services.interface';

@Injectable()
export class MovieService implements IService<Movie> {

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

    async update(dto: Movie): Promise<Movie> {
        throw new Error('Method not implemented.');
    }

    async find(id: string): Promise<Movie> {
        return await this.movieRepository.findOne(id);
    }

    async findByName(name: string): Promise<Movie> {
        const result = await this.movieRepository.find({ where: { name } });
        return result[0];
    }
}
