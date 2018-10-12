import { Module } from '@nestjs/common';
import { LoggingInterceptor } from './interceptors/LoggingInterceptor';

@Module({
    providers: [LoggingInterceptor],
    exports: [LoggingInterceptor],
})
export class CommonModule { }
