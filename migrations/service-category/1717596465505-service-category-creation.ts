import { MigrationInterface, QueryRunner } from "typeorm";

export class ServiceCategoryCreation1717596465505 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE service_category (
      id VARCHAR PRIMARY KEY,
      name VARCHAR NOT NULL,
      creation_date TIMESTAMP NOT NULL,
      update_date TIMESTAMP NOT NULL
    ); 
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE service_category;`);
  }

}
