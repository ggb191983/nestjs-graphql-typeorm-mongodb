import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieModule } from './movie/movie.module';
import { CommonModule } from './common/common.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { Logger } from 'common/log/logger.service';
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
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: '192.168.99.100',
      port: 27017,
      username: 'ggomez',
      password: 'D-1n4m4rc4',
      database: 'mongo',
      logging: 'all',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    MovieModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger, { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor }],
})
export class AppModule { }
