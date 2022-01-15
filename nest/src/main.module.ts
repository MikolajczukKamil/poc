import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppModule } from './app/app.module';
import { TypeOrmConfigService } from './TypeOrmConfig.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    AppModule,
  ],
})
export class MainModule {}
