import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './App.controller';
import { AppService } from './app.service';
import { AppRxController } from './AppRx.controller';
import { AppRxService } from './AppRx.service';
import { FooDataEntity } from './data/FooData.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FooDataEntity])],
  controllers: [AppController, AppRxController],
  providers: [AppService, AppRxService],
})
export class AppModule {}
