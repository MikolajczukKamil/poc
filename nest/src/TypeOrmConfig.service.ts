import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import { OptimisticLockingSubscriber } from './OptimisticLocking.subscriber';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const dbConfig: PostgresConnectionOptions = {
      type: 'postgres',
      logging: 'all',
      port: 5432,
      host: 'localhost',
      schema: 'public',
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
    };

    return {
      autoLoadEntities: true,
      ...dbConfig,
      subscribers: [OptimisticLockingSubscriber],
    };
  }
}
