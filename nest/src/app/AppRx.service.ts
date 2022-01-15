import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FooDataEntity } from './data/FooData.entity';

@Injectable()
export class AppRxService {
  constructor(
    @InjectRepository(FooDataEntity)
    private readonly fooRepo: Repository<FooDataEntity>,
  ) {}

  get(id: number): Observable<FooDataEntity> {
    return from(this.fooRepo.findOneOrFail(id));
  }

  getAll(): Observable<FooDataEntity[]> {
    return from(this.fooRepo.find());
  }

  save(foo: FooDataEntity): Observable<FooDataEntity> {
    return from(this.fooRepo.save(foo));
  }
}
