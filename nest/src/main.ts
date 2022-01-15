import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';
import { NestFactory } from '@nestjs/core';

import { MainModule } from './main.module';

async function bootstrap() {
  initializeTransactionalContext();
  patchTypeORMRepositoryWithBaseRepository();

  const app = await NestFactory.create(MainModule);

  await app.listen(3000);
}

bootstrap().then(console.info, console.error);
