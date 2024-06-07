import { injectable } from 'inversify';
import { InsertResult, Repository, UpdateResult } from 'typeorm';
import { DatabaseConfig } from '../configs/database.config';
import { PaginationHelper } from '../helpers/pagination.helper';
import { CompanyEntity } from '../../domain/entities/company.entity';
import CompanyListingRequest from '../../domain/dtos/company/requests/company-listing.request';

@injectable()
export class CompanyRepository {
  private repository: Repository<CompanyEntity>;

  constructor() {
    this.repository = DatabaseConfig.getConnection().getRepository(CompanyEntity);
  }

  public async insert(company: CompanyEntity): Promise<InsertResult> {
    return this.repository.insert(company);
  }

  public async update(company: CompanyEntity): Promise<UpdateResult> {
    return this.repository.update({ id: company.id }, company);
  }

  public async findById(id: string): Promise<CompanyEntity> {
    return this.repository.findOneBy({ id });
  }

  async toList(paginationRequest: CompanyListingRequest): Promise<[CompanyEntity[], number]> {
    const pagination = PaginationHelper.get(paginationRequest);

    const result = await this.repository.findAndCount({
      ...pagination,
      where: {}
    });

    return result;
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}