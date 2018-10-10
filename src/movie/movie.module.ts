import { Module } from '@nestjs/common';
import { MovieResolvers } from './movie.resolvers';
import { MovieService } from './movie.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { CommonModule } from 'common/common.module';

@Module({
    imports: [TypeOrmModule.forFeature([Movie]), CommonModule],
    providers: [MovieService, MovieResolvers],
    exports: [MovieService],
})
export class MovieModule { }
