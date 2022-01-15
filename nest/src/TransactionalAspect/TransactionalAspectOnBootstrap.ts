import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository
} from 'typeorm-transactional-cls-hooked'

export function TransactionalAspectOnBootstrap() {
  initializeTransactionalContext()
  patchTypeORMRepositoryWithBaseRepository()
}
