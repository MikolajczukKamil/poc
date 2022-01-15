import { Entity, Column, PrimaryColumn, VersionColumn } from 'typeorm';

@Entity({ name: 'foo-data' })
export class FooDataEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  data: string;

  @VersionColumn()
  version = 0;

  constructor(id: number, data: string) {
    this.id = id;
    this.data = data;
  }
}
