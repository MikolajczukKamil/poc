import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { FooEntity } from '../data/Foo/Foo.entity'

@Injectable()
export class AppPromiseService {
  constructor(
    @InjectRepository(FooEntity)
    private readonly fooRepo: Repository<FooEntity>
  ) {
  }

  async get(id: number): Promise<FooEntity> {
    return this.fooRepo.findOneOrFail(id, { lock: { mode: 'optimistic', version: 1 } })
  }

  async getAll(): Promise<FooEntity[]> {
    return this.fooRepo.find({ lock: { mode: 'optimistic', version: 2 } })
  }

  async save(foo: FooEntity): Promise<FooEntity> {
    return this.fooRepo.save(foo)
  }
}
