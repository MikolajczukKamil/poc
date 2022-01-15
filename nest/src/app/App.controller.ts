import { Controller, Get, Param, Post } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';

import { AppService } from './app.service';

function wait(time: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, time));
}

@Controller('promise')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Transactional()
  @Get()
  async getAll() {
    console.log('\n\n\n\n\n\n\n\n');

    return this.appService.getAll();
  }

  @Transactional()
  @Get(':id')
  async get(@Param() id: number) {
    console.log('\n\n\n\n\n\n\n\n');

    return this.appService.get(id);
  }

  @Transactional()
  @Post(':id')
  async update(@Param() id: number) {
    console.log('\n\n\n\n\n\n\n\n');

    const entity = await this.appService.get(id);

    await wait(2000);
    console.log('\n\n\n');

    entity.data = `${new Date()}`;

    console.log('SAVE');
    return this.appService.save(entity);
  }
}
