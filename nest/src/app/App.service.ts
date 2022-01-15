import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FooDataEntity } from './data/FooData.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(FooDataEntity)
    private readonly fooRepo: Repository<FooDataEntity>,
  ) {}

  async get(id: number): Promise<FooDataEntity> {
    return this.fooRepo.findOneOrFail(id);
  }

  async getAll(): Promise<FooDataEntity[]> {
    return this.fooRepo.find();
  }

  async save(foo: FooDataEntity): Promise<FooDataEntity> {
    return this.fooRepo.save(foo);
  }
}
