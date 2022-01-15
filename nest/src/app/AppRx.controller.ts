import { delay, switchMap } from 'rxjs';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { Controller, Get, Param, Post } from '@nestjs/common';

import { AppRxService } from './AppRx.service';

@Controller('rx')
export class AppRxController {
  constructor(private readonly appService: AppRxService) {}

  @Transactional()
  @Get()
  getAll() {
    console.log('\n\n\n\n\n\n\n\n');

    return this.appService.getAll();
  }

  @Transactional()
  @Get(':id')
  get(@Param() id: number) {
    console.log('\n\n\n\n\n\n\n\n');

    return this.appService.get(id);
  }

  @Transactional()
  @Post(':id')
  update(@Param() id: number) {
    console.log('\n\n\n\n\n\n\n\n');

    return this.appService.get(id).pipe(
      delay(5000),
      switchMap((entity) => {
        console.log('\n\n\n');

        entity.data = `${new Date()}`;

        return this.appService.save(entity);
      }),
    );
  }
}
