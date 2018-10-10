import { Injectable, NestInterceptor, ExecutionContext, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { BunyanLogger, Logger } from 'common/log/logger.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private _logger: Logger;

    constructor(@Inject(Logger)
    private readonly logger: Logger) {
        this._logger = logger;
    }

    intercept(
        context: ExecutionContext,
        call$: Observable<any>,
    ): Observable<any> {
        const log: BunyanLogger = this._logger.createLogger(context.getClass().name);
        log.debug(`${context.getHandler().name}`);
        return call$/* .pipe(
            tap(() => {
                log.debug(`${context.getHandler().name} After... ${Date.now() - now}ms`);
            },
            )) */;
    }
}