import { delay, from, map, Observable, of, switchMap, tap } from 'rxjs'

import { getValue } from '../util/getValue'
import { wait } from '../util/wait'

export interface RepoService<T> {
  get(id: number): Promise<T>

  save(entity: T): Promise<T>
}

export class Updater<T extends { version: number }> {
  constructor(
    private readonly repo: RepoService<T>,
    private readonly updateAction: (entity: T, data: string) => void
  ) {
  }

  async updateDataPromise(id: number): Promise<T> {
    const data = getValue()

    console.info(`  -- SELECT START ${ data }`)
    const entity = await this.repo.get(id)
    console.info(`  -- SELECT END ${ data }, v=${ entity.version }`)

    await wait(2000)

    this.updateAction(entity, data)

    console.info(`  -- SAVE START ${ data } ${ entity.version }`)
    const result = await this.repo.save(entity)
    console.info(`  -- SAVE END ${ data }, v=${ entity.version }, entity === result`, entity === result)

    return result
  }

  updateDataRx(id: number): Observable<T> {
    const data = getValue()

    return of(data)
      .pipe(
        tap(() => console.info(`  -- SELECT START ${ data }`)),
        switchMap(() => from(this.repo.get(id))),
        tap((entity) => console.info(`  -- SELECT END ${ data }, v=${ entity.version }`)),

        delay(2000),

        map((entity) => {
          this.updateAction(entity, data)

          return entity
        }),

        tap((entity) => console.info(`  -- SAVE START ${ data } ${ entity.version }`)),
        switchMap((entity) => from(this.repo.save(entity))),
        tap((entity) => console.info(`  -- SAVE END ${ data }, v=${ entity.version }`))
      )
  }
}
