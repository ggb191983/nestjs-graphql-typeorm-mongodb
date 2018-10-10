import { ParseIntPipe, UseGuards, Inject, UseInterceptors } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Movie, ObjectID } from '../graphql.schema';
import { MovieGuard } from './movie.guard';
import { MovieService } from './movie.service';
import { CreateMovieDto, MovieDto } from './movie.entity';
import { Logger, BunyanLogger } from 'common/log/logger.service';
import { LoggingInterceptor } from 'common/interceptors/LoggingInterceptor';

const pubSub = new PubSub();

@UseInterceptors(LoggingInterceptor)
@Resolver('Movie')
export class MovieResolvers {
    private movieService: MovieService;
    private log: BunyanLogger;

    constructor(@Inject(MovieService) movieService: MovieService,
        @Inject(Logger) logger: Logger) {
        this.movieService = movieService;
        this.log = logger.createLogger('Movie.Resolver');
    }

    @Query()
    @UseGuards(MovieGuard)
    async getMovies() {
        return await this.movieService.findAll();
    }

    @Query('movie')
    async findOneById(
        /* @Args('_id', ParseIntPipe) */
        @Args('_id')
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