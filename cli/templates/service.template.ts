const getServiceTemplate = (
  name: string,
  camelCaseName: string,
  pascalCaseName: string
): string => {
  return `
import { inject, injectable } from 'inversify';
import { v4 as uuidv4 } from 'uuid';
import ${pascalCaseName}CreationResponse from '../dtos/${name}/responses/${name}-creation.response';
import { ${pascalCaseName}Repository } from '../../infrastructure/repositories/${name}.repository';
import ${pascalCaseName}CreationRequest from '../dtos/${name}/requests/${name}-creation.request';
import { HttpBadRequestError } from '../../infrastructure/middlewares/http-error.middleware';
import ${pascalCaseName}UpdateRequest from '../dtos/${name}/requests/${name}-update.request';
import ${pascalCaseName}FindingByIdResponse from '../dtos/${name}/responses/${name}-finding-by-id.response';
import { PaginationResponse } from '../../infrastructure/helpers/pagination.helper';
import ${pascalCaseName}ListingRequest from '../dtos/${name}/requests/${name}-listing.request';
import ${pascalCaseName}ListingResponse from '../dtos/${name}/responses/${name}-listing.response';

@injectable()
export class ${pascalCaseName}Service {
  constructor(
    @inject(${pascalCaseName}Repository) private readonly ${camelCaseName}Repository: ${pascalCaseName}Repository,
  ) { }

  public async create(request: ${pascalCaseName}CreationRequest): Promise<${pascalCaseName}CreationResponse> {
    const ${camelCaseName} = {
      ...request,
      id: uuidv4(),
      creationDate: new Date(),
      updateDate: new Date(),
      deactivationDate: null,
    };

    await this.${camelCaseName}Repository.insert(${camelCaseName});

    const { id } = ${camelCaseName};

    const response = {
      id,
    };

    return response;
  }

  public async update(id: string, request: ${pascalCaseName}UpdateRequest): Promise<void> {
    const ${camelCaseName} = await this.${camelCaseName}Repository.findById(id);

    if (!${camelCaseName})
      throw new HttpBadRequestError('${pascalCaseName} was not found.');

    ${camelCaseName}.name = request.name;

    await this.${camelCaseName}Repository.update(${camelCaseName});
  }

  public async disable(id: string): Promise<void> {
    const ${camelCaseName} = await this.${camelCaseName}Repository.findById(id);

    if (!${camelCaseName})
      throw new HttpBadRequestError('${pascalCaseName} was not found.');

    ${camelCaseName}.deactivationDate = new Date();

    await this.${camelCaseName}Repository.update(${camelCaseName});
  }

  public async findById(id: string): Promise<${pascalCaseName}FindingByIdResponse> {
    const ${camelCaseName} = await this.${camelCaseName}Repository.findById(id);

    if (!${camelCaseName})
      throw new HttpBadRequestError('${pascalCaseName} was not found.');

    const { name, creationDate, updateDate, deactivationDate } = ${camelCaseName};

    const response = {
      name,
      creationDate,
      updateDate,
      deactivationDate
    };

    return response;
  }

  public async toList(request: ${pascalCaseName}ListingRequest): Promise<PaginationResponse<${pascalCaseName}ListingResponse>> {
    const [items, count] = await this.${camelCaseName}Repository.toList(request);

    const rows = items.map(({
      id,
      name,
      creationDate,
      updateDate,
      deactivationDate
    }) => ({
      id,
      name,
      creationDate,
      updateDate,
      deactivationDate
    }));

    return {
      rows,
      count
    };
  }

  public async delete(id: string): Promise<void> {
    await this.${camelCaseName}Repository.delete(id);
  }
}

`;
}

export { getServiceTemplate };