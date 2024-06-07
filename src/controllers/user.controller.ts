import { inject } from 'inversify';
import {
  BaseHttpController,
  IHttpActionResult,
  controller,
  httpGet,
  httpPost,
  httpPut,
  queryParam,
  request,
  requestBody,
  requestParam,
} from 'inversify-express-utils';
import { UserService } from '../domain/services/user.service';
import { AdminAuthMiddleware } from '../infrastructure/middlewares/admin-auth.middleware';
import UserLoginRequest from '../domain/dtos/user/requests/user-login.request';
import UserCreationRequest from '../domain/dtos/user/requests/user-creation.request';
import UserContextRequest from '../domain/dtos/user/requests/user-payload.request';
import { ClientAuthMiddleware } from '../infrastructure/middlewares/client-auth.middleware';
import UserFindingPagedRequest from '../domain/dtos/user/requests/user-finding-paged.request';
import UserUpdateRequest from '../domain/dtos/user/requests/user-update.request';

@controller('/users')
export class UserController extends BaseHttpController {
  constructor(
    @inject(UserService)
    private readonly userService: UserService,
  ) {
    super();
  }

  @httpGet('/:id', AdminAuthMiddleware)
  public async findById(
    @requestParam('id') id: string,
  ): Promise<IHttpActionResult> {
    const response = await this.userService.findById(id);
    return this.json(response, 200);
  }

  @httpGet('/', ClientAuthMiddleware)
  public async findAll(): Promise<IHttpActionResult> {
    const response = await this.userService.findAll();
    return this.json(response, 200);
  }

  @httpGet('/listing/paged', AdminAuthMiddleware)
  public async findPaged(@queryParam() request: UserFindingPagedRequest): Promise<IHttpActionResult> {
    const response = await this.userService.findPaged(request);
    return this.json(response, 200);
  }

  @httpPost('/')
  public async create(
    @requestBody() request: UserCreationRequest,
  ): Promise<IHttpActionResult> {
    const response = await this.userService.create(request);
    return this.json(response, 200);
  }

  @httpPut('/:id', AdminAuthMiddleware)
  public async update(
    @requestParam('id') id: string,
    @requestBody() request: UserUpdateRequest,
  ): Promise<IHttpActionResult> {
    const response = await this.userService.update(id, request);
    return this.json(response, 200);
  }

  @httpPost('/login')
  public async login(
    @requestBody() request: UserLoginRequest,
  ): Promise<IHttpActionResult> {
    const response = await this.userService.login(request);
    return this.json(response, 200);
  }

  @httpGet('/session/info', AdminAuthMiddleware)
  public async getInfo(@request() request: UserContextRequest): Promise<IHttpActionResult> {
    return this.json(request.user, 200);
  }
}
