// https://github.com/typeorm/typeorm/issues/3608#issuecomment-476352843
import {
  EventSubscriber,
  EntitySubscriberInterface,
  UpdateEvent,
} from 'typeorm';

export class OptimisticLockVersionMismatchError extends Error {
  readonly entityName: string;
  readonly entityId: string;

  constructor(
    entity: any,
    public readonly expectedVersion: number,
    public readonly actualVersion: number,
  ) {
    super(
      `The optimistic lock on entity ${
        entity?.constructor?.name || entity.toString()
      } failed, version ${expectedVersion} was expected, but is actually ${actualVersion}.`,
    );

    this.entityId = entity.id || '-';
    this.entityName = entity?.constructor?.name || entity.toString();
  }
}

const EXPECTED_VERSION_METADATA = Symbol('EXPECTED_VERSION');

@EventSubscriber()
export class OptimisticLockingSubscriber implements EntitySubscriberInterface {
  beforeUpdate({ entity, metadata: { versionColumn } }: UpdateEvent<any>) {
    if (versionColumn) {
      const currentVersion: number = Reflect.get(
        entity,
        versionColumn.propertyName,
      );

      Reflect.defineMetadata(
        EXPECTED_VERSION_METADATA,
        currentVersion + 1,
        entity,
      );
    }
  }

  afterUpdate({ entity, metadata: { versionColumn } }: UpdateEvent<any>) {
    if (versionColumn) {
      const expectedVersion: number = Reflect.getOwnMetadata(
        EXPECTED_VERSION_METADATA,
        entity,
      );

      Reflect.deleteMetadata(EXPECTED_VERSION_METADATA, entity);

      const actualVersion: number = Reflect.get(
        entity,
        versionColumn.propertyName,
      );

      if (expectedVersion !== actualVersion) {
        throw new OptimisticLockVersionMismatchError(
          entity,
          expectedVersion,
          actualVersion,
        );
      }
    }
  }
}
