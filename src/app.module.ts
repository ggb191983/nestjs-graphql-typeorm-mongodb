import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieModule } from './movie/movie.module';
import { CommonModule } from './common/common.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { LoggingInterceptor } from 'common/interceptors/LoggingInterceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      /* include: [MovieModule], */
      definitions: {
        path: join(process.cwd(), 'src/graphql.schema.ts'),
        outputAs: 'class',
      },
    }),
    MovieModule,
    CommonModule,
  ],
  controllers: [],
  providers: [{ provide: APP_INTERCEPTOR, useClass: LoggingInterceptor }]
})
export class AppModule { }
