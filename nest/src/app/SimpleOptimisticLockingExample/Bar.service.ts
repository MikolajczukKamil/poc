import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { BarEntity } from './data/Bar.entity'

@Injectable()
export class BarService {
  constructor(
    @InjectRepository(BarEntity)
    private readonly fooRepo: Repository<BarEntity>
  ) {
  }

  async get(id: number): Promise<BarEntity> {
    return this.fooRepo.findOneOrFail(id)
  }

  async getAll(): Promise<BarEntity[]> {
    return this.fooRepo.find()
  }

  async save(foo: BarEntity): Promise<BarEntity> {
    return this.fooRepo.save(foo)
  }
}
