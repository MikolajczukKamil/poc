import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { FooEntity } from './data/Foo/Foo.entity'
import { FooDataEntity } from './data/Foo/FooData.entity'

import { DataActionService } from './DataAction.service'

import { AppPromiseController } from './transaction-promise/AppPromise.controller'
import { AppPromiseService } from './transaction-promise/AppPromise.service'

import { AppRxController } from './transaction-rxjs/AppRx.controller'
import { AppRxService } from './transaction-rxjs/AppRx.service'

import { BarEntity } from './SimpleOptimisticLockingExample/data/Bar.entity'
import { SimpleOptimisticLockingExampleController } from './SimpleOptimisticLockingExample/SimpleOptimisticLockingExampleController'
import { BarService } from './SimpleOptimisticLockingExample/Bar.service'


@Module({
  imports: [ TypeOrmModule.forFeature([ FooEntity, FooDataEntity, BarEntity ]) ],
  controllers: [ AppPromiseController, AppRxController, SimpleOptimisticLockingExampleController ],
  providers: [ DataActionService, AppPromiseService, AppRxService, BarService ]
})
export class AppModule {
}
