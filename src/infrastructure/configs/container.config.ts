import { Container } from 'inversify';
import { EligibilityService } from '../../domain/services/eligibility.service';
import { EligibilityController } from '../../controllers/eligibility.controller';
import { UserRepository } from '../repositories/user.repository';
import { UserController } from '../../controllers/user.controller';
import { UserService } from '../../domain/services/user.service';
import { AdminAuthMiddleware } from '../middlewares/admin-auth.middleware';
import { ClientAuthMiddleware } from '../middlewares/client-auth.middleware';

export class ContainerConfig {
  public static container: Container;

  public static start(): Container {
    this.container = new Container();

    this.configureServices();
    this.configureRepositories();
    this.configureControllers();
    this.configureMiddlewares();

    return this.container;
  }

  private static configureControllers(): void {
    this.container.bind<EligibilityController>(EligibilityController).toSelf();
    this.container.bind<UserController>(UserController).toSelf();
  }

  private static configureRepositories(): void {
    this.container.bind<UserRepository>(UserRepository).toSelf();
  }

  private static configureServices(): void {
    this.container.bind<EligibilityService>(EligibilityService).toSelf();
    this.container.bind<UserService>(UserService).toSelf();
  }

  private static configureMiddlewares(): void {
    this.container.bind<AdminAuthMiddleware>(AdminAuthMiddleware).toSelf();
    this.container.bind<ClientAuthMiddleware>(ClientAuthMiddleware).toSelf();
  }
}
