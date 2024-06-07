import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { UserEntity } from '../../domain/entities/user.entity';

dotenv.config();

export class DatabaseConfig {
  public static dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: false,
    logging: false,
    entities: [ __dirname + '/../../**/*.entity{.ts,.js}'],
    migrations: [],
    subscribers: [],
  });

  public static getConnection(): DataSource {
    return this.dataSource
  }

  public static initialize = async (): Promise<void> => {
    try {

      await this.dataSource.initialize();
      console.log('🟢 Data Source has been initialized.');
      this.setupCloseOnExit();
    } catch (error) {
      console.error('Error during Data Source initialization:', error);
      throw error;
    }
  };

  private static setupCloseOnExit() {
    const events: NodeJS.Signals[] = ['SIGINT', 'SIGTERM'];
    events.forEach((event) => {
      process.on(event, async () => {
        await this.close();
        process.exit(0);
      });
    });
  }

  public static close = async (): Promise<void> => {
    try {
      await this.dataSource.destroy();
      console.log('🔴 Data Source has been closed.');
    } catch (error) {
      console.error('Error during Data Source closure:', error);
      throw error;
    }
  };
}
