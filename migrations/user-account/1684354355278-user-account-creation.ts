import { MigrationInterface, QueryRunner } from "typeorm";

export class UserAccountCreation1684354355278 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE user_account (
      id VARCHAR PRIMARY KEY,
      name VARCHAR NOT NULL,
      email VARCHAR NOT NULL,
      creation_date TIMESTAMP NOT NULL,
      update_date TIMESTAMP NOT NULL,
      username VARCHAR NOT NULL,
      password VARCHAR NOT NULL,
      role VARCHAR NOT NULL
    );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE user_account;`);
  }
}