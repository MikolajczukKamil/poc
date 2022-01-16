import { Injectable } from '@nestjs/common'

import { FooEntity } from './data/Foo/Foo.entity'

@Injectable()
export class DataActionService {
  doAction(entity: FooEntity, entity2: FooEntity): void {
    entity.addData(new Date().getTime().toString())
    entity2.addData(new Date().getMilliseconds().toString())
  }
}
