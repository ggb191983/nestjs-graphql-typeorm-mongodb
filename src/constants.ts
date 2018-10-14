import { ConnectionOptions } from 'typeorm/connection/ConnectionOptions';

export const DbConfiguration: ConnectionOptions = {
    type: 'mongodb',
    host: '192.168.99.100',
    port: 27017,
    username: 'user',
    password: 'password',
    database: 'mongo',
    logging: 'all',
    entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
    ],
    synchronize: true,
};