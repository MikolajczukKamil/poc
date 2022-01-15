import { NestFactory, Reflector } from '@nestjs/core'
import { ClassSerializerInterceptor } from '@nestjs/common'

import { MainModule } from './main.module'
import { TransactionalAspectOnBootstrap } from './TransactionalAspect/TransactionalAspectOnBootstrap'

async function bootstrap() {
  TransactionalAspectOnBootstrap()

  const app = await NestFactory.create(MainModule)

  await app
    .useGlobalInterceptors(
      new ClassSerializerInterceptor(app.get(Reflector), { excludePrefixes: [ '_' ] })
    )
    .listen(3000)
}

bootstrap().then(console.info, console.error)
