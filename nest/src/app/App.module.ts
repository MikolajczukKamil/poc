import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { FooEntity } from './data/Foo.entity'
import { FooDataEntity } from './data/FooData.entity'

import { DataActionService } from './DataAction.service'

import { AppPromiseController } from './transaction-promise/AppPromise.controller'
import { AppPromiseService } from './transaction-promise/AppPromise.service'

import { AppRxController } from './transaction-rxjs/AppRx.controller'
import { AppRxService } from './transaction-rxjs/AppRx.service'

@Module({
  imports: [ TypeOrmModule.forFeature([ FooEntity, FooDataEntity ]) ],
  controllers: [ AppPromiseController, AppRxController ],
  providers: [ DataActionService, AppPromiseService, AppRxService ]
})
export class AppModule {
}
