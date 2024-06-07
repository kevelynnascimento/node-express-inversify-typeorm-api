import { Application } from 'express';
import { ContainerConfig } from './infrastructure/configs/container.config';
import { ServerConfig } from './infrastructure/configs/server.config';
import { DatabaseConfig } from './infrastructure/configs/database.config';

export class Bootstraper {
  public static async start(): Promise<Application> {
    const container = ContainerConfig.start();

    const server = ServerConfig.configure(container);

    await DatabaseConfig.initialize();

    const app: Application = server.build();

    return app;
  }
}
