import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';

dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  migrationsTableName: 'migration',
  migrations: ['migrations/**/**/*{.ts,.js}'],
  migrationsRun: false,
  logging: true
})
