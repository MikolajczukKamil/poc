import { Column, Entity, PrimaryGeneratedColumn, VersionColumn } from 'typeorm'

import { UpdatableEntity } from '../../shared/Updater.controller'

@Entity({ name: 'bar' })
export class BarEntity implements UpdatableEntity {
  @PrimaryGeneratedColumn()
  id: number

  @VersionColumn()
  version = 0

  @Column()
  data: string

  constructor(id: number, data: string) {
    this.id = id
    this.data = data
  }

  addData(data: string): void {
    this.data = data
  }
}
