import { Column, Entity, OneToMany, PrimaryGeneratedColumn, VersionColumn } from 'typeorm'

import { UpdatableEntity } from '../../shared/Updater.controller'
import { FooDataEntity }   from './FooData.entity'

@Entity({ name: 'foo' })
export class FooEntity implements UpdatableEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

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

  constructor(id: number, name: string) {
    this.id = id
    this.name = name
  }

  addData(data: string): void {
    // this.name += Math.round(Math.random() * 100).toString()

    this.list.push(new FooDataEntity(data, this))
  }
}
