import { injectable } from 'inversify';
import { InsertResult, Repository, UpdateResult } from 'typeorm';
import { DatabaseConfig } from '../configs/database.config';
import { PaginationHelper, PaginationRequest } from '../helpers/pagination.helper';
import { ServiceCategoryEntity } from '../../domain/entities/service-category.entity';

@injectable()
export class ServiceCategoryRepository {
  private repository: Repository<ServiceCategoryEntity>;

  constructor() {
    this.repository = DatabaseConfig.getConnection().getRepository(ServiceCategoryEntity);
  }

  public async findAll(): Promise<ServiceCategoryEntity[]> {
    return this.repository.find();
  }

  public async findById(id: string): Promise<ServiceCategoryEntity> {
    return this.repository.findOneBy({ id });
  }

  async findAndCount(paginationRequest: PaginationRequest): Promise<[ServiceCategoryEntity[], number]> {
    const pagination = PaginationHelper.get(paginationRequest);

    const result = await this.repository.findAndCount({
      ...pagination,
      where: {}
    });

    return result;
  }

  public async update(serviceCategory: ServiceCategoryEntity): Promise<UpdateResult> {
    return this.repository.update({ id: serviceCategory.id }, serviceCategory);
  }

  public async insert(serviceCategory: ServiceCategoryEntity): Promise<InsertResult> {
    return this.repository.insert(serviceCategory);
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
