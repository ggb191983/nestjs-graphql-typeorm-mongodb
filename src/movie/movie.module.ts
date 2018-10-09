import { Module } from '@nestjs/common';
import { MovieResolvers } from './movie.resolvers';
import { MovieService } from './movie.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movie.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Movie])],
    providers: [MovieService, MovieResolvers],
    exports: [MovieService],
})
export class MovieModule { }
