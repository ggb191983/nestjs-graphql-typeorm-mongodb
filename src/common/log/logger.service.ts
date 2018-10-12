
/**
 * Debug helper file.
 */
import * as bunyan from 'bunyan';
import * as BunyanLogger from 'bunyan';
import { Injectable } from '@nestjs/common';

/* import { bunyanFormat } from 'bunyan-format';
import { RotatingFileStream } from 'bunyan-format'; */

// tslint:disable-next-line:no-var-requires
const bunyanFormat = require('bunyan-format')
    // tslint:disable-next-line:no-var-requires
    , RotatingFileStream = require('bunyan-rotating-file-stream');

export { BunyanLogger as BunyanLogger };

@Injectable()
export class Logger {
    log: BunyanLogger;
    // /**
    //  * bunyanFormat: Creates a writable stream that formats bunyan records written to it.
    //  *
    //  * @name BunyanFormatWritable
    //  * @function
    //  * param opts {Options} passed to bunyan format function
    //  *  - outputMode: short|long|simple|json|bunyan
    //  *  - color (true): toggles colors in output
    //  *  - colorFromLevel: allows overriding log level colors
    //  * @param out {Stream} (process.stdout) writable stream to write
    //  * @return {WritableStream} that you can pipe bunyan output into
    //  */
    constructor() {
        const projectName = 'my-graphql';
        this.log = bunyan.createLogger(this.getDebugConfigShort((projectName ? projectName + ':' : '')));
    }

    createLogger(name: string): BunyanLogger {
        return this.log.child({ module: name });
    }

    /**
     * Returns Config.
     * @param name
     * @returns {{name: string, src: boolean, level: number, streams: Array}}
     */
    private getDebugConfigShort(name: string) {
        const env = 'development';
        /*var fileStream = {
         type: 'rotating-file',
         path: './log/app.log',
         period: '1d',   // daily rotation
         count: 3        // keep 3 back copies
         };*/
        const bunyanStream = {
            stream: bunyanFormat({
                type: 'stream',
                out: process.stdout,
                outputMode: 'short',
                color: true,
                colorFromLevel: {
                    10: 'white',   // TRACE
                    20: 'yellow',  // DEBUG
                    30: 'cyan',    // INFO
                    40: 'magenta', // WARN
                    50: 'red',     // ERROR
                    60: 'inverse',  // FATAL
                },
            }),
        };

        const fileStream = {
            stream: new RotatingFileStream({
                type: 'rotating-file',
                path: `./log/${'my-graphql'}-app.log-${Date.now()}`,
                period: '1d',   // daily rotation
                threshold: '10m',
                gzip: true,
                totalFiles: 3,   // keep 3 back copies
            }),
        };

        const config = {
            name,
            src: true,
            level: 20, // 10 = Display EVERYTHING!
            streams: Array(),
        };

        config.streams.push(bunyanStream);
        if (env === 'development') {
            // TODO Handle rotating-file on Linux.
            config.streams.push(fileStream);
        }
        return config;
    }
}
