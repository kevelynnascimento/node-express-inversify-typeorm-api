import { MigrationInterface, QueryRunner } from "typeorm";

export class CompanyCreation1716663246876 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE company (
          id VARCHAR PRIMARY KEY,
          name VARCHAR NOT NULL,
          creation_date TIMESTAMP NOT NULL,
          update_date TIMESTAMP NOT NULL,
          deactivation_date TIMESTAMP NULL
        );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE company;`);
  }

}
