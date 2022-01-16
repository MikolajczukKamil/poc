import { switchMap, timer, zip } from 'rxjs'
import { Transactional } from 'typeorm-transactional-cls-hooked'
import { Controller, Get } from '@nestjs/common'

import { FooService } from './Foo.service'
import { FooEntity } from './data/Foo.entity'
import { Updater } from '../shared/Updater'

function wait(time: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, time))
}

@Controller('ol-nested')
export class FooController {
  private readonly updater: Updater<FooEntity>

  constructor(private readonly fooService: FooService) {
    this.updater = new Updater(
      fooService,
      (entity, data) => entity.addData(data)
    )
  }

  @Get('all')
  getAll(): Promise<FooEntity[]> {
    return this.fooService.getAll()
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
