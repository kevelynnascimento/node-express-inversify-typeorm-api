import { inject, injectable } from 'inversify';
import { v4 as uuidv4 } from 'uuid';
import UserCreationResponse from '../dtos/user/responses/user-creation.response';
import { HttpBadRequestError } from '../../infrastructure/middlewares/http-error.middleware';
import { ServiceCategoryRepository } from '../../infrastructure/repositories/service-category.repository';
import ServiceCategoryCreationRequest from '../dtos/service-category/requests/service-category-creation.request';
import ServiceCategoryUpdateRequest from '../dtos/service-category/requests/service-category-update.request';

@injectable()
export class ServiceCategoryService {
  constructor(
    @inject(ServiceCategoryRepository) private readonly serviceCategoryRepository: ServiceCategoryRepository,
  ) { }

  public async create(request: ServiceCategoryCreationRequest): Promise<UserCreationResponse> {
    const serviceCategory = {
      ...request,
      id: uuidv4(),
      creationDate: new Date(),
      updateDate: new Date(),
    };


    await this.serviceCategoryRepository.insert(serviceCategory);

    const { id } = serviceCategory;

    const response = {
      id,
    };

    return response;
  }

  public async update(id: string, request: ServiceCategoryUpdateRequest): Promise<void> {
    const serviceCategory = await this.serviceCategoryRepository.findById(id);

    if (!serviceCategory)
      throw new HttpBadRequestError('Service category was not found.');

    serviceCategory.name = request.name;

    await this.serviceCategoryRepository.update(serviceCategory);
  }
}
