import { Entity, OneToMany, PrimaryGeneratedColumn, VersionColumn } from 'typeorm'

import { FooDataEntity } from './FooData.entity'

@Entity({ name: 'foo' })
export class FooEntity {
  @PrimaryGeneratedColumn()
  id: number

  @VersionColumn()
  version = 0

  /**
   * InitializedRelationError:
   * Array initializations are not allowed in entity relations.
   * Please remove array initialization (= []) from "FooEntity#list".
   * This is ORM requirement to make relations to work properly.
   * Refer docs for more information.
   *
   * https://stackoverflow.com/questions/59351687/why-is-my-many-to-many-relationship-field-undefined
   */
  @OneToMany(() => FooDataEntity, fooData => fooData.foo, { eager: true, cascade: true })
  list!: FooDataEntity[]

  constructor(id: number) {
    this.id = id
  }

  addData(data: string): void {
    this.list.push(new FooDataEntity(data, this))
  }
}
