import { Transactional } from 'typeorm-transactional-cls-hooked'
import { switchMap, timer, zip } from 'rxjs'
import { Controller, Get } from '@nestjs/common'

import { BarService } from './Bar.service'
import { wait } from '../util/wait'
import { BarEntity } from './data/Bar.entity'
import { Updater } from '../shared/Updater'

@Controller('ol-simple')
export class BarController {
  private readonly updater: Updater<BarEntity>

  constructor(private readonly barService: BarService) {
    this.updater = new Updater(
      barService,
      (entity, data) => entity.data = data
    )
  }

  @Get('all')
  getAll(): Promise<BarEntity[]> {
    return this.barService.getAll()
  }

  // Promise - Single

  @Get('promise/single')
  async promiseSingle() {
    return this.updater.updateDataPromise(1)
  }

  @Transactional()
  @Get('promise/transactional/single')
  async promiseTransactionalSingle() {
    return this.promiseSingle()
  }

  // Promise - Concurrent

  @Get('promise/concurrent')
  async promiseConcurrent() {
    return Promise.all([
      this.updater.updateDataPromise(1),
      wait(1000).then(() => this.updater.updateDataPromise(1))
    ])
  }

  @Transactional()
  @Get('promise/transactional/concurrent')
  async promiseTransactionalConcurrent() {
    return this.promiseConcurrent()
  }

  // Rx - Single

  @Get('rx/single')
  rxSingle() {
    return this.updater.updateDataRx(1)
  }

  @Transactional()
  @Get('rx/transactional/single')
  rxTransactionalSingle() {
    return this.rxSingle()
  }

  // Rx - Concurrent

  @Get('rx/concurrent')
  rxConcurrent() {
    return zip([
      this.updater.updateDataRx(1),
      timer(1000).pipe(switchMap(() => this.updater.updateDataRx(1)))
    ])
  }

  @Transactional()
  @Get('rx/transactional/concurrent')
  rxTransactionalConcurrent() {
    return this.rxConcurrent()
  }
}
