import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('user_account')
export class UserEntity {
  @PrimaryColumn({ name: 'id' })
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'creation_date' })
  creationDate: Date;

  @Column({ name: 'update_date' })
  updateDate: Date;

  @Column({ name: 'username' })
  username: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'role' })
  role: string;
}
