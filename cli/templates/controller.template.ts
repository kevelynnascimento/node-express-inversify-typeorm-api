const getControllerTemplate = (name: string, camelCaseName: string, pascalCaseName: string): string => {
  return `
import { inject } from 'inversify';
import {
  BaseHttpController,
  IHttpActionResult,
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
  queryParam,
  requestBody,
  requestParam,
} from 'inversify-express-utils';
import { AdminAuthMiddleware } from '../infrastructure/middlewares/admin-auth.middleware';
import { ${pascalCaseName}Service } from '../domain/services/${name}.service';
import ${pascalCaseName}CreationRequest from '../domain/dtos/${name}/requests/${name}-creation.request';
import ${pascalCaseName}UpdateRequest from '../domain/dtos/${name}/requests/${name}-update.request';
import ${pascalCaseName}ListingRequest from '../domain/dtos/${name}/requests/${name}-listing.request';

@controller('/${name}')
export class ${pascalCaseName}Controller extends BaseHttpController {
  constructor(
    @inject(${pascalCaseName}Service)
    private readonly ${camelCaseName}Service: ${pascalCaseName}Service,
  ) {
    super();
  }

  @httpPost('/', AdminAuthMiddleware)
  public async create(
    @requestBody() request: ${pascalCaseName}CreationRequest,
  ): Promise<IHttpActionResult> {
    const response = await this.${camelCaseName}Service.create(request);
    return this.json(response, 200);
  }

  @httpPut('/:id', AdminAuthMiddleware)
  public async update(
    @requestParam('id') id: string,
    @requestBody() request: ${pascalCaseName}UpdateRequest,
  ): Promise<IHttpActionResult> {
    const response = await this.${camelCaseName}Service.update(id, request);
    return this.json(response, 200);
  }

  @httpPost('/:id/deactivation', AdminAuthMiddleware)
  public async disable(@requestParam('id') id: string): Promise<IHttpActionResult> {
    const response = await this.${camelCaseName}Service.disable(id);
    return this.json(response, 200);
  }

  @httpGet('/:id/finding-one', AdminAuthMiddleware)
  public async findById(
    @requestParam('id') id: string,
  ): Promise<IHttpActionResult> {
    const response = await this.${camelCaseName}Service.findById(id);
    return this.json(response, 200);
  }

  @httpGet('/listing', AdminAuthMiddleware)
  public async toList(@queryParam() request: ${pascalCaseName}ListingRequest): Promise<IHttpActionResult> {
    const response = await this.${camelCaseName}Service.toList(request);
    return this.json(response, 200);
  }

  @httpDelete('/:id', AdminAuthMiddleware)
  public async delete(@requestParam('id') id: string): Promise<IHttpActionResult> {
    const response = await this.${camelCaseName}Service.delete(id);
    return this.json(response, 200);
  }
}
`;
}

export { getControllerTemplate };