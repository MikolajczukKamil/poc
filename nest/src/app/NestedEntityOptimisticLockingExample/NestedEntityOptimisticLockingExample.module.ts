import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { FooEntity } from './Data/Foo.entity'
import { FooDataEntity } from './Data/FooData.entity'

import { FooController } from './Foo.controller'
import { FooService } from './Foo.service'


@Module({
  imports: [
    TypeOrmModule.forFeature([ FooEntity, FooDataEntity ]) ],
  controllers: [ FooController ],
  providers: [ FooService ]
})
export class NestedEntityOptimisticLockingExampleModule {
}
