import { catchError, delay, from, map, Observable, of, switchMap, tap, timer, zip } from 'rxjs'
import { Transactional } from 'typeorm-transactional-cls-hooked'
import { Get } from '@nestjs/common'

function getValue(): string {
  return new Date().getTime().toString()
}

function wait(time: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, time))
}

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

  @Get('promise/transactional/single')
  async promiseTransactionalSingle() {
    return this.updateDataPromiseTransactional(1)
  }

  // Promise - Concurrent

  @Get('promise/concurrent')
  async promiseConcurrent() {
    return this.promiseTest('updateDataPromise')

  }

  @Get('promise/transactional/concurrent')
  async promiseTransactionalConcurrent() {
    return this.promiseTest('updateDataPromiseTransactional')
  }

  private async promiseTest(method: 'updateDataPromise' | 'updateDataPromiseTransactional') {
    return Promise.all([
      this[method](1),
      wait(1000)
        .then(() => this[method](1))
        .catch(() => null)
    ]).then(this.mapValue)
  }


  // Rx - Single

  @Get('rx/single')
  rxSingle() {
    return this.updateDataRx(1)
  }

  @Get('rx/transactional/single')
  rxTransactionalSingle() {
    return this.updateDataRxTransactional(1)
  }

  // Rx - Concurrent

  @Get('rx/concurrent')
  rxConcurrent() {
    return this.rxTest('updateDataRx')
  }

  @Get('rx/transactional/concurrent')
  rxTransactionalConcurrent() {
    return this.rxTest('updateDataRxTransactional')
  }

  private rxTest(methodName: 'updateDataRxTransactional' | 'updateDataRx') {
    return zip([
      this[methodName](1),
      timer(1000)
        .pipe(
          switchMap(() => this[methodName](1)),
          catchError(() => of(null))
        )
    ]).pipe(map(this.mapValue))
  }

  // updateDataPromise

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

  @Transactional()
  private async updateDataPromiseTransactional(id: number): Promise<T> {
    return this.updateDataPromise(id)
  }

  // updateDataRx

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

  @Transactional()
  private updateDataRxTransactional(id: number): Observable<T> {
    return this.updateDataRx(id)
  }

  // helpers

  private mapValue = (result: [ T, T | null ]) => ({
    result,
    equal: result[0] === result[1]
  })
}
