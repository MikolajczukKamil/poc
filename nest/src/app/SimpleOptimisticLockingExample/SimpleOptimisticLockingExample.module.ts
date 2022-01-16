import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { BarEntity } from './data/Bar.entity'
import { BarController } from './Bar.controller'
import { BarService } from './Bar.service'

@Module({
  imports: [ TypeOrmModule.forFeature([ BarEntity ]) ],
  controllers: [ BarController ],
  providers: [ BarService ]
})
export class SimpleOptimisticLockingExampleModule {
}
