import { Module } from '@nestjs/common';
import { Logger } from './log/logger.service';
import { LoggingInterceptor } from './interceptors/LoggingInterceptor';

@Module({
    providers: [Logger, LoggingInterceptor],
    exports: [Logger, LoggingInterceptor],
})
export class CommonModule { }
