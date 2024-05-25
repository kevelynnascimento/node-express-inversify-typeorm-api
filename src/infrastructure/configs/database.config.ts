import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { UserEntity } from '../../domain/entities/user.entity';

dotenv.config();

export class DatabaseConfig {
  public static testMode: boolean = false;
  public static dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: true,
    logging: false,
    entities: [UserEntity],
    migrations: [],
    subscribers: [],
  });

  public static testingDataSource = new DataSource({
    type: 'better-sqlite3',
    database: ':memory:',
    dropSchema: true,
    entities: [UserEntity],
    synchronize: true,
  });

  public static getConnection(): DataSource {
    return !this.testMode ? this.dataSource : this.testingDataSource;
  }

  public static initialize = async (testMode: boolean = false): Promise<void> => {
    try {
      this.testMode = testMode

      if (!testMode) {
        await this.dataSource.initialize();
        console.log('🟢 Data Source has been initialized.');
      } else {
        await this.testingDataSource.initialize();
      }

      this.setupCloseOnExit(testMode);
    } catch (error) {
      console.error('Error during Data Source initialization:', error);
      throw error;
    }
  };

  private static setupCloseOnExit(testMode: boolean) {
    const events: NodeJS.Signals[] = ['SIGINT', 'SIGTERM'];
    events.forEach((event) => {
      process.on(event, async () => {
        await this.close(testMode);
        process.exit(0);
      });
    });
  }

  public static close = async (testMode: boolean): Promise<void> => {
    try {
      if (!testMode) {
        await this.dataSource.destroy();
        console.log('🔴 Data Source has been closed.');
      } else {
        await this.testingDataSource.destroy();
      }
    } catch (error) {
      console.error('Error during Data Source closure:', error);
      throw error;
    }
  };
}
