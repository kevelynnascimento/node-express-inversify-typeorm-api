import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('service_category')
export class ServiceCategoryEntity {
  @PrimaryColumn({ name: 'id' })
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'creation_date' })
  creationDate: Date;

  @Column({ name: 'update_date' })
  updateDate: Date;
}
