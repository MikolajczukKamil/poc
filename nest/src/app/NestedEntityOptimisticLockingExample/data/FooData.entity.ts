import { Exclude } from 'class-transformer'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

import { FooEntity } from './Foo.entity'

@Entity({ name: 'foo_data' })
export class FooDataEntity {
  @PrimaryColumn({ generated: true })
  id!: number

  @Column()
  data: string

  @Exclude()
  @JoinColumn({ name: 'foo_id' })
  @ManyToOne(() => FooEntity, foo => foo.list)
  foo: FooEntity

  constructor(data: string, foo: FooEntity) {
    this.data = data
    this.foo = foo
  }
}
