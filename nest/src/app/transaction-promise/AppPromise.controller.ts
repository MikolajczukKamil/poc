import { Transactional } from 'typeorm-transactional-cls-hooked'
import { Controller, Get, Param, Post } from '@nestjs/common'

import { AppPromiseService } from './AppPromise.service'
import { DataActionService } from '../DataAction.service'

function wait(time: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, time))
}

@Controller('promise')
export class AppPromiseController {
  constructor(
    private readonly appService: AppPromiseService,
    private readonly actionService: DataActionService
  ) {
  }

  @Get()
  async getAll() {
    return this.appService.getAll()
  }

  @Post(':id/:id2')
  async update(
    @Param('id') id: string,
    @Param('id2') id2: string
  ) {
    const [ entity, entity2 ] = await Promise.all([
      this.appService.get(+id),
      this.appService.get(+id2)
    ])

    await wait(2000)

    this.actionService.doAction(entity, entity2)

    return Promise.all([
        this.appService.save(entity),
        this.appService.save(entity2)
      ]
    )
  }

  @Transactional()
  @Get('transactional')
  async getAllTransactional() {
    return this.getAll()
  }

  @Transactional()
  @Post('transactional/:id/:id2')
  async updateTransactional(
    @Param('id') id: string,
    @Param('id2') id2: string
  ) {
    return this.update(id, id2)
  }
}
