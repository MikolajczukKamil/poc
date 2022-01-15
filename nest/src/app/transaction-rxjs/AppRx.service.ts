import { from, Observable } from 'rxjs'
import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { FooEntity } from '../data/Foo.entity'

@Injectable()
export class AppRxService {
  constructor(
    @InjectRepository(FooEntity)
    private readonly fooRepo: Repository<FooEntity>
  ) {
  }

  get(id: number): Observable<FooEntity> {
    return from(this.fooRepo.findOneOrFail(id))
  }

  getAll(): Observable<FooEntity[]> {
    return from(this.fooRepo.find())
  }

  save(foo: FooEntity): Observable<FooEntity> {
    return from(this.fooRepo.save(foo))
  }
}
