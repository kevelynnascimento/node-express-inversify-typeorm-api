import { inject, injectable } from 'inversify';
import { v4 as uuidv4 } from 'uuid';
import { CompanyRepository } from '../../infrastructure/repositories/company.repository';
import CompanyCreationRequest from '../dtos/company/requests/company-creation.request';
import { HttpBadRequestError } from '../../infrastructure/middlewares/http-error.middleware';
import CompanyUpdateRequest from '../dtos/company/requests/company-update.request';
import CompanyFindingByIdResponse from '../dtos/company/responses/company-finding-by-id.response';
import { PaginationResponse } from '../../infrastructure/helpers/pagination.helper';
import CompanyListingRequest from '../dtos/company/requests/company-listing.request';
import CompanyListingResponse from '../dtos/company/responses/company-listing.response';
import CompanyCreationResponse from '../dtos/company/responses/company-creation.response';

@injectable()
export class CompanyService {
  constructor(
    @inject(CompanyRepository) private readonly companyRepository: CompanyRepository,
  ) { }

  public async create(request: CompanyCreationRequest): Promise<CompanyCreationResponse> {
    const company = {
      ...request,
      id: uuidv4(),
      creationDate: new Date(),
      updateDate: new Date(),
      deactivationDate: null,
    };

    await this.companyRepository.insert(company);

    const { id } = company;

    const response = {
      id,
    };

    return response;
  }

  public async update(id: string, request: CompanyUpdateRequest): Promise<void> {
    const company = await this.companyRepository.findById(id);

    if (!company)
      throw new HttpBadRequestError('Company was not found.');

    company.name = request.name;

    await this.companyRepository.update(company);
  }

  public async disable(id: string): Promise<void> {
    const company = await this.companyRepository.findById(id);

    if (!company)
      throw new HttpBadRequestError('Company was not found.');

    company.deactivationDate = new Date();

    await this.companyRepository.update(company);
  }

  public async findById(id: string): Promise<CompanyFindingByIdResponse> {
    const company = await this.companyRepository.findById(id);

    if (!company)
      throw new HttpBadRequestError('Company was not found.');

    const { name, creationDate, updateDate, deactivationDate } = company;

    const response = {
      name,
      creationDate,
      updateDate,
      deactivationDate
    };

    return response;
  }

  public async toList(request: CompanyListingRequest): Promise<PaginationResponse<CompanyListingResponse>> {
    const [items, count] = await this.companyRepository.toList(request);

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
    await this.companyRepository.delete(id);
  }
}
