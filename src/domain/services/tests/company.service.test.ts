import 'reflect-metadata';
import { mock, instance, when, verify, anything } from 'ts-mockito';
import { CompanyService } from '../company.service';
import { CompanyRepository } from '../../../infrastructure/repositories/company.repository';
import { CompanyEntity } from '../../entities/company.entity';

describe('CompanyService', () => {
  let companyService: CompanyService;
  let companyRepositoryMock: CompanyRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    companyRepositoryMock = mock(CompanyRepository);
    companyService = new CompanyService(instance(companyRepositoryMock));
  });

  describe('create', () => {
    it('should create a new company', async () => {
      const request = {
        name: 'Company name'
      };

      const insertResultMock = {
        identifiers: [],
        generatedMaps: [],
        raw: null
      };

      when(companyRepositoryMock.insert(anything())).thenResolve(insertResultMock);

      const output = await companyService.create(request);

      expect(output).toEqual({
        id: expect.any(String)
      });

      verify(companyRepositoryMock.insert(anything())).called();
    });
  });

  describe('update', () => {
    it('should update a company', async () => {
      const companyMock = {
        id: '5',
        name: 'Company name',
        creationDate: new Date(),
        updateDate: new Date(),
        deactivationDate: null
      };

      const updateResultMock = {
        identifiers: [],
        generatedMaps: [],
        raw: null
      };

      const companyUpdateRequest = {
        name: 'Updated'
      };

      when(companyRepositoryMock.findById(anything())).thenResolve(companyMock);

      when(companyRepositoryMock.update(anything())).thenResolve(updateResultMock);

      await companyService.update(companyMock.id, companyUpdateRequest);

      verify(companyRepositoryMock.findById(anything())).called();

      verify(companyRepositoryMock.update(anything())).called();
    });

    it('should return not found error', async () => {
      const id = '5';

      const companyUpdateRequest = {
        name: 'Updated'
      };

      when(companyRepositoryMock.findById(anything())).thenResolve(null);

      await expect(companyService.update(id, companyUpdateRequest)).rejects.toThrow();

      verify(companyRepositoryMock.findById(anything())).called();
      verify(companyRepositoryMock.update(anything())).never();
    });
  });

  describe('disable', () => {
    it('should disable a company', async () => {
      const companyMock = {
        id: '5',
        name: 'Company name',
        creationDate: new Date(),
        updateDate: new Date(),
        deactivationDate: null
      };

      const updateResultMock = {
        identifiers: [],
        generatedMaps: [],
        raw: null
      };

      when(companyRepositoryMock.findById(anything())).thenResolve(companyMock);

      when(companyRepositoryMock.update(anything())).thenResolve(updateResultMock);

      await companyService.disable(companyMock.id);

      verify(companyRepositoryMock.findById(anything())).called();

      verify(companyRepositoryMock.update(anything())).called();
    });

    it('should return not found error', async () => {
      const id = '5';

      when(companyRepositoryMock.findById(anything())).thenResolve(null);

      await expect(companyService.disable(id)).rejects.toThrow();

      verify(companyRepositoryMock.findById(anything())).called();
      verify(companyRepositoryMock.update(anything())).never();
    });
  });

  describe('findById', () => {
    it('should find a company', async () => {
      const companyMock = {
        id: '5',
        name: 'Company name',
        creationDate: new Date(),
        updateDate: new Date(),
        deactivationDate: null
      };

      when(companyRepositoryMock.findById(anything())).thenResolve(companyMock);

      const output = await companyService.findById(companyMock.id);

      expect(output).toEqual({
        name: companyMock.name,
        creationDate: companyMock.creationDate,
        updateDate: companyMock.updateDate,
        deactivationDate: companyMock.deactivationDate
      });

      verify(companyRepositoryMock.findById(anything())).called();
    });

    it('should return not found error', async () => {
      const id = '5';

      when(companyRepositoryMock.findById(anything())).thenResolve(null);

      await expect(companyService.findById(id)).rejects.toThrow();

      verify(companyRepositoryMock.findById(anything())).called();
    });
  });

  describe('toList', () => {
    it('should find a company', async () => {
      const companiesMock: [CompanyEntity[], number] = [
        [
          {
            id: '5',
            name: 'Company name',
            creationDate: new Date(),
            updateDate: new Date(),
            deactivationDate: null
          }
        ],
        1
      ];

      const companyListingRequest = {
        page: 0,
        pageSize: 100,
        orderColumn: null,
        orderDirection: null
      };

      when(companyRepositoryMock.toList(anything())).thenResolve(companiesMock);

      const output = await companyService.toList(companyListingRequest);

      expect(output).toEqual({
        rows: expect.any(Array),
        count: expect.any(Number)
      });

      verify(companyRepositoryMock.toList(anything())).called();
    });
  });

  describe('delete', () => {
    it('should delete a company', async () => {
      const id = '5';

      when(companyRepositoryMock.delete(anything())).thenResolve();

      await companyService.delete(id);

      verify(companyRepositoryMock.delete(anything())).called();
    });
  });
});
