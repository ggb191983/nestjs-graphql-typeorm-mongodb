import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Movie, ObjectID } from '../graphql.schema';
import { MovieGuard } from './movie.guard';
import { MovieService } from './movie.service';
import { CreateMovieDto, MovieDto } from './movie.entity';

const pubSub = new PubSub();

@Resolver('Movie')
export class MovieResolvers {
    constructor(private readonly movieService: MovieService) { }

    @Query()
    @UseGuards(MovieGuard)
    async getMovies() {
        return await this.movieService.findAll();
    }

    @Query('movie')
    async findOneById(
        /* @Args('id', ParseIntPipe) */
        @Args('id')
        id: string,
    ): Promise<Movie> {
        const movie = await this.movieService.find(id);
        return movie;

    }

    @Mutation('createMovie')
    async create(@Args('createMovieInput') args: CreateMovieDto): Promise<Movie> {
        args.createdAt = args.updatedAt = new Date();
        const createdMovie = await this.movieService.create(args);
        pubSub.publish('catCreated', { catCreated: createdMovie });
        return createdMovie;
    }

    @Subscription('movieCreated')
    catCreated() {
        return {
            subscribe: () => pubSub.asyncIterator('movieCreated'),
        };
    }
}