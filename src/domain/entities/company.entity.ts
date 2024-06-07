import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('company')
export class CompanyEntity {
  @PrimaryColumn({ name: 'id' })
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'creation_date' })
  creationDate: Date;

  @Column({ name: 'update_date' })
  updateDate: Date;

  @Column({ name: 'deactivation_date' })
  deactivationDate: Date;
}
