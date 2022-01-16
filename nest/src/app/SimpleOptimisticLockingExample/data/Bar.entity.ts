import { Column, Entity, PrimaryGeneratedColumn, VersionColumn } from 'typeorm'

@Entity({ name: 'bar' })
export class BarEntity {
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
}
