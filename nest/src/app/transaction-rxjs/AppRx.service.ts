import { from, Observable } from 'rxjs'
import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { FooEntity } from '../data/Foo/Foo.entity'

@Injectable()
export class AppRxService {
  constructor(
    @InjectRepository(FooEntity)
    private readonly fooRepo: Repository<FooEntity>
  ) {
  }

  get(id: number): Observable<FooEntity> {
    console.log("pessimistic_write_or_fail")
    return from(this.fooRepo.findOneOrFail(id, { lock: { mode: 'pessimistic_read' } }))
  }

  getAll(): Observable<FooEntity[]> {
    console.log("pessimistic_write_or_fail")

    return from(this.fooRepo.find({ lock: { mode: 'pessimistic_read' } }))
  }

  save(foo: FooEntity): Observable<FooEntity> {
    return from(this.fooRepo.save(foo))
  }
}
