import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { FooEntity } from '../data/Foo.entity'

@Injectable()
export class AppPromiseService {
  constructor(
    @InjectRepository(FooEntity)
    private readonly fooRepo: Repository<FooEntity>
  ) {
  }

  async get(id: number): Promise<FooEntity> {
    return this.fooRepo.findOneOrFail(id)
  }

  async getAll(): Promise<FooEntity[]> {
    return this.fooRepo.find()
  }

  async save(foo: FooEntity): Promise<FooEntity> {
    return this.fooRepo.save(foo, {})
  }
}
