import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { RepoService } from '../shared/Updater.controller'
import { FooEntity } from './Data/Foo.entity'

@Injectable()
export class FooService implements RepoService<FooEntity> {
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
    return this.fooRepo.save(foo)
  }
}
