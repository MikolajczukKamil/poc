// https://github.com/typeorm/typeorm/issues/3608#issuecomment-476352843
import { EntitySubscriberInterface, EventSubscriber, UpdateEvent } from 'typeorm'

const EXPECTED_VERSION_METADATA = Symbol('EXPECTED_VERSION')

@EventSubscriber()
export class OptimisticLockingSubscriber implements EntitySubscriberInterface {
  beforeUpdate({ entity, metadata: { versionColumn } }: UpdateEvent<any>) {
    if (versionColumn) {
      const currentVersion: number = Reflect.get(
        entity,
        versionColumn.propertyName
      )

      Reflect.defineMetadata(
        EXPECTED_VERSION_METADATA,
        currentVersion + 1,
        entity
      )
    }
  }

  afterUpdate({ entity, metadata: { versionColumn } }: UpdateEvent<any>) {
    if (versionColumn) {
      const expectedVersion: number = Reflect.getOwnMetadata(
        EXPECTED_VERSION_METADATA,
        entity
      )

      Reflect.deleteMetadata(EXPECTED_VERSION_METADATA, entity)

      const actualVersion: number = Reflect.get(
        entity,
        versionColumn.propertyName
      )

      if (expectedVersion !== actualVersion) {
        // throw new OptimisticLockVersionMismatchError(
        //   entity.constructor.name,
        //   expectedVersion,
        //   actualVersion
        // )
      }
    }
  }
}
