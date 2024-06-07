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
import { CompanyService } from '../domain/services/company.service';
import CompanyCreationRequest from '../domain/dtos/company/requests/company-creation.request';
import CompanyUpdateRequest from '../domain/dtos/company/requests/company-update.request';
import CompanyListingRequest from '../domain/dtos/company/requests/company-listing.request';

@controller('/companies')
export class CompanyController extends BaseHttpController {
  constructor(
    @inject(CompanyService)
    private readonly companyService: CompanyService,
  ) {
    super();
  }

  @httpPost('/', AdminAuthMiddleware)
  public async create(
    @requestBody() request: CompanyCreationRequest,
  ): Promise<IHttpActionResult> {
    const response = await this.companyService.create(request);
    return this.json(response, 200);
  }

  @httpPut('/:id', AdminAuthMiddleware)
  public async update(
    @requestParam('id') id: string,
    @requestBody() request: CompanyUpdateRequest,
  ): Promise<IHttpActionResult> {
    const response = await this.companyService.update(id, request);
    return this.json(response, 200);
  }

  @httpPost('/:id/deactivation', AdminAuthMiddleware)
  public async disable(@requestParam('id') id: string): Promise<IHttpActionResult> {
    const response = await this.companyService.disable(id);
    return this.json(response, 200);
  }

  @httpGet('/:id/finding-one', AdminAuthMiddleware)
  public async findById(
    @requestParam('id') id: string,
  ): Promise<IHttpActionResult> {
    const response = await this.companyService.findById(id);
    return this.json(response, 200);
  }

  @httpGet('/listing', AdminAuthMiddleware)
  public async toList(@queryParam() request: CompanyListingRequest): Promise<IHttpActionResult> {
    const response = await this.companyService.toList(request);
    return this.json(response, 200);
  }

  @httpDelete('/:id', AdminAuthMiddleware)
  public async delete(@requestParam('id') id: string): Promise<IHttpActionResult> {
    const response = await this.companyService.delete(id);
    return this.json(response, 200);
  }
}