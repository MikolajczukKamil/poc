import { Controller } from '@nestjs/common'

import { BarService } from './Bar.service'
import { BarEntity } from './data/Bar.entity'
import { UpdaterController } from '../shared/Updater.controller'

@Controller('ol-simple')
export class BarController extends UpdaterController<BarEntity> {
  constructor(protected override readonly repoService: BarService) {
    super()
  }
}
