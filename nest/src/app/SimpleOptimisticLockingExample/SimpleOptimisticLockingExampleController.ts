import { Transactional } from 'typeorm-transactional-cls-hooked'
import { delay, from, map, Observable, of, switchMap, tap, timer, zip } from 'rxjs'
import { Controller, Get } from '@nestjs/common'

import { BarService } from './Bar.service'
import { wait } from '../util/wait'
import { BarEntity } from './data/Bar.entity'

@Controller('ol-simple')
export class SimpleOptimisticLockingExampleController {
  private static getValue(): number {
    return new Date().getTime()
  }

  @Get('all')
  getAll(): Promise<BarEntity[]> {
    return this.appService.getAll()
  }

  constructor(private readonly appService: BarService) {
  }

  // Promise - Single

  @Get('promise/single')
  async promiseSingle() {
    return this.updateDataPromise(1)
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
      this.updateDataPromise(1),
      wait(1000).then(() => this.updateDataPromise(1))
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
    return this.updateDataRx(1)
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
      this.updateDataRx(1),
      timer(1000).pipe(switchMap(() => this.updateDataRx(1)))
    ])
  }

  @Transactional()
  @Get('rx/transactional/concurrent')
  rxTransactionalConcurrent() {
    return this.rxConcurrent()
  }

  private async updateDataPromise(id: number): Promise<BarEntity> {
    const data = SimpleOptimisticLockingExampleController.getValue().toString()

    console.info(`  -- SELECT START ${ data }`)
    const entity = await this.appService.get(id)
    console.info(`  -- SELECT END ${ data }, v=${ entity.version }`)

    await wait(2000)

    entity.data = data

    console.info(`  -- SAVE START ${ data } ${ entity.version }`)
    const result = await this.appService.save(entity)
    console.info(`  -- SAVE END ${ data }, v=${ entity.version }, entity === result`, entity === result)

    return result
  }

  private updateDataRx(id: number): Observable<BarEntity> {
    const data = SimpleOptimisticLockingExampleController.getValue().toString()

    return of(data)
      .pipe(
        tap(() => console.info(`  -- SELECT START ${ data }`)),
        switchMap(() => from(this.appService.get(id))),
        tap((entity) => console.info(`  -- SELECT END ${ data }, v=${ entity.version }`)),

        delay(2000),

        map((entity) => {
          entity.data = data

          return entity
        }),

        tap((entity) => console.info(`  -- SAVE START ${ data } ${ entity.version }`)),
        switchMap((entity) => from(this.appService.save(entity))),
        tap((entity) => console.info(`  -- SAVE END ${ data }, v=${ entity.version }`))
      )
  }
}
