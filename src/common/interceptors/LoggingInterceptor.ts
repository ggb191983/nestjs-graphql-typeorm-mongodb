import { NestInterceptor, ExecutionContext, Logger, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {

    _logger: Logger = new Logger('LoggingInterceptor');

    intercept(
        context: ExecutionContext,
        call$: Observable<any>,
    ): Observable<any> {
        this._logger.log('Before...');

        const now = Date.now();
        return call$.pipe(
            tap(() => this._logger.log(`After... ${Date.now() - now}ms`)),
        );
    }
}