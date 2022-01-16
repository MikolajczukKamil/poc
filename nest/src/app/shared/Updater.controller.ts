import { delay, from, map, Observable, of, switchMap, tap, timer, zip } from 'rxjs'
import { Transactional } from 'typeorm-transactional-cls-hooked'
import { Get } from '@nestjs/common'

import { getValue } from '../util/getValue'
import { wait } from '../util/wait'

export interface UpdatableEntity {
  version: number

  addData(data: string): void
}

export interface RepoService<T> {
  get(id: number): Promise<T>

  save(entity: T): Promise<T>

  getAll(): Promise<T[]>
}

export abstract class UpdaterController<T extends UpdatableEntity> {
  protected abstract readonly repoService: RepoService<T>

  @Get('all')
  getAll(): Promise<T[]> {
    return this.repoService.getAll()
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


  private async updateDataPromise(id: number): Promise<T> {
    const data = getValue()

    console.info(`  -- SELECT START ${ data }`)
    const entity = await this.repoService.get(id)
    console.info(`  -- SELECT END ${ data }, v=${ entity.version }`)

    await wait(2000)

    entity.addData(data)

    console.info(`  -- SAVE START ${ data } ${ entity.version }`)
    const result = await this.repoService.save(entity)
    console.info(`  -- SAVE END ${ data }, v=${ entity.version }, entity === result`, entity === result)

    return result
  }

  private updateDataRx(id: number): Observable<T> {
    const data = getValue()

    return of(data)
      .pipe(
        tap(() => console.info(`  -- SELECT START ${ data }`)),
        switchMap(() => from(this.repoService.get(id))),
        tap((entity) => console.info(`  -- SELECT END ${ data }, v=${ entity.version }`)),

        delay(2000),

        map((entity) => {
          entity.addData(data)

          return entity
        }),

        tap((entity) => console.info(`  -- SAVE START ${ data } ${ entity.version }`)),
        switchMap((entity) => from(this.repoService.save(entity))),
        tap((entity) => console.info(`  -- SAVE END ${ data }, v=${ entity.version }`))
      )
  }
}
