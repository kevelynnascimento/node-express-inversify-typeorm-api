import { inject } from 'inversify';
import {
  BaseHttpController,
  IHttpActionResult,
  controller,
  httpPost,
  httpPut,
  requestBody,
  requestParam,
} from 'inversify-express-utils';
import { AdminAuthMiddleware } from '../infrastructure/middlewares/admin-auth.middleware';
import { ServiceCategoryService } from '../domain/services/service-category.service';
import ServiceCategoryCreationRequest from '../domain/dtos/service-category/requests/service-category-creation.request';
import ServiceCategoryUpdateRequest from '../domain/dtos/service-category/requests/service-category-update.request';

@controller('/service-categories')
export class ServiceCategoryController extends BaseHttpController {
  constructor(
    @inject(ServiceCategoryService)
    private readonly serviceCategoryService: ServiceCategoryService,
  ) {
    super();
  }

  @httpPost('/', AdminAuthMiddleware)
  public async create(
    @requestBody() request: ServiceCategoryCreationRequest,
  ): Promise<IHttpActionResult> {
    const response = await this.serviceCategoryService.create(request);
    return this.json(response, 200);
  }

  @httpPut('/:id', AdminAuthMiddleware)
  public async update(
    @requestParam('id') id: string,
    @requestBody() request: ServiceCategoryUpdateRequest,
  ): Promise<IHttpActionResult> {
    const response = await this.serviceCategoryService.update(id, request);
    return this.json(response, 200);
  }
}
