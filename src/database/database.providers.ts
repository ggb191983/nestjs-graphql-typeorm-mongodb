import { createConnection } from 'typeorm';
import { DbConfiguration } from '../constants';

export const databaseProviders = [
  {
    provide: 'DbConnection',
    useFactory: async () => await createConnection(DbConfiguration),
  },
];