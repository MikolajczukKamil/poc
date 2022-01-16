import { Controller } from '@nestjs/common'

import { FooService } from './Foo.service'
import { FooEntity } from './data/Foo.entity'
import { UpdaterController } from '../shared/Updater.controller'

@Controller('ol-nested')
export class FooController extends UpdaterController<FooEntity> {
  constructor(protected override readonly repoService: FooService) {
    super()
  }
}
