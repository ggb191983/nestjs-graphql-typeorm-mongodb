import { Module } from '@nestjs/common';
import { MovieResolvers } from './movie.resolvers';
import { MovieService } from './movie.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { CommonModule } from 'common/common.module';
import { DatabaseModule } from 'database/database.module';
import { Connection } from 'typeorm';

export const movieProviders = [
    {
        provide: 'MovieRepository',
        useFactory: (connection: Connection) => connection.getRepository(Movie),
        inject: ['DbConnection'],
    },
];

@Module({
    imports: [DatabaseModule, CommonModule],
    providers: [...movieProviders, MovieService, MovieResolvers],
    exports: [MovieService],
})
export class MovieModule { }
