import { Controller }        from '@nestjs/common'
import { UpdaterController } from '../shared/Updater.controller'

import { BarService } from './Bar.service'
import { BarEntity }  from './data/Bar.entity'

@Controller('ol-simple')
export class BarController extends UpdaterController<BarEntity> {
  constructor(barService: BarService) {
    super(barService)
  }
}
