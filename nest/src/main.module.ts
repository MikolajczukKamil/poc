import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { TypeOrmConfigService } from './TypeOrmConfig.service'
import { SimpleOptimisticLockingExampleModule } from './app/SimpleOptimisticLockingExample/SimpleOptimisticLockingExample.module'
import { NestedEntityOptimisticLockingExampleModule } from './app/NestedEntityOptimisticLockingExample/NestedEntityOptimisticLockingExample.module'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    SimpleOptimisticLockingExampleModule,
    NestedEntityOptimisticLockingExampleModule
  ]
})
export class MainModule {
}
