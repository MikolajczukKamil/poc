import { delay, switchMap, tap, zip } from 'rxjs'
import { Transactional } from 'typeorm-transactional-cls-hooked'
import { Controller, Get, Param, Post } from '@nestjs/common'

import { DataActionService } from '../DataAction.service'
import { AppRxService } from './AppRx.service'

@Controller('rx')
export class AppRxController {
  constructor(
    private readonly appService: AppRxService,
    protected readonly actionService: DataActionService
  ) {
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.appService.get(+id)
      .pipe(
        switchMap(() => this.appService.get(+id))
      )
  }


  @Get()
  getAll() {
    return this.appService.getAll()
  }

  @Post(':id/:id2')
  update(
    @Param('id') id: string,
    @Param('id2') id2: string
  ) {
    return zip(
      this.appService.get(+id),
      this.appService.get(+id2)
    ).pipe(
      delay(2000),
      tap(([ entity, entity2 ]) => {
        this.actionService.doAction(entity, entity2)
      }),
      switchMap(([ entity, entity2 ]) =>
        zip(
          this.appService.save(entity),
          this.appService.save(entity2)
        )
      )
    )
  }

  @Transactional()
  @Get('transactional/:id')
  getTransactional(@Param('id') id: string) {
    return this.get(id)
  }

  @Transactional()
  @Get('transactional')
  getAllTransactional() {
    return this.getAll()
  }

  @Transactional()
  @Post('transactional/:id/:id2')
  updateTransactional(
    @Param('id') id: string,
    @Param('id2') id2: string
  ) {
    return this.update(id, id2)
  }
}
