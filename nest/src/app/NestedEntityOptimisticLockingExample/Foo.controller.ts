import { Controller } from '@nestjs/common'

import { UpdaterController } from '../shared/Updater.controller'
import { FooEntity }         from './data/Foo.entity'
import { FooService }        from './Foo.service'

@Controller('ol-nested')
export class FooController extends UpdaterController<FooEntity> {
  constructor(fooService: FooService) {
    super(fooService)
  }
}
