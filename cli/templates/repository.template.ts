const getRepositoryTemplate = (name: string, camelCaseName: string, pascalCaseName: string): string => {
  return `
import { injectable } from 'inversify';
import { InsertResult, Repository, UpdateResult } from 'typeorm';
import { DatabaseConfig } from '../configs/database.config';
import { PaginationHelper } from '../helpers/pagination.helper';
import { ${pascalCaseName}Entity } from '../../domain/entities/${name}.entity';
import ${pascalCaseName}ListingRequest from '../../domain/dtos/${name}/requests/${name}-listing.request';

@injectable()
export class ${pascalCaseName}Repository {
  private repository: Repository<${pascalCaseName}Entity>;

  constructor() {
    this.repository = DatabaseConfig.getConnection().getRepository(${pascalCaseName}Entity);
  }

  public async insert(${camelCaseName}: ${pascalCaseName}Entity): Promise<InsertResult> {
    return this.repository.insert(${camelCaseName});
  }

  public async update(${camelCaseName}: ${pascalCaseName}Entity): Promise<UpdateResult> {
    return this.repository.update({ id: ${camelCaseName}.id }, ${camelCaseName});
  }

  public async findById(id: string): Promise<${pascalCaseName}Entity> {
    return this.repository.findOneBy({ id });
  }

  async toList(paginationRequest: ${pascalCaseName}ListingRequest): Promise<[${pascalCaseName}Entity[], number]> {
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
`;
}

export { getRepositoryTemplate };