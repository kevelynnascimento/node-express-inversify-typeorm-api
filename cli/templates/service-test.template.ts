const getServiceTestTemplate = (name: string, camelCaseName: string, pascalCaseName: string): string => {
  return `
import 'reflect-metadata';
import { mock, instance, when, verify, anything } from 'ts-mockito';
import { ${pascalCaseName}Service } from '../${name}.service';
import { ${pascalCaseName}Repository } from '../../../infrastructure/repositories/${name}.repository';
import { ${pascalCaseName}Entity } from '../../entities/${name}.entity';

describe('${pascalCaseName}Service', () => {
  let ${camelCaseName}Service: ${pascalCaseName}Service;
  let ${camelCaseName}RepositoryMock: ${pascalCaseName}Repository;

  beforeEach(() => {
    jest.clearAllMocks();
    ${camelCaseName}RepositoryMock = mock(${pascalCaseName}Repository);
    ${camelCaseName}Service = new ${pascalCaseName}Service(instance(${camelCaseName}RepositoryMock));
  });

  describe('create', () => {
    it('should create a new ${pascalCaseName}', async () => {
      const request = {
        name: '${pascalCaseName} name'
      };

      const insertResultMock = {
        identifiers: [],
        generatedMaps: [],
        raw: null
      };

      when(${camelCaseName}RepositoryMock.insert(anything())).thenResolve(insertResultMock);

      const output = await ${camelCaseName}Service.create(request);

      expect(output).toEqual({
        id: expect.any(String)
      });

      verify(${camelCaseName}RepositoryMock.insert(anything())).called();
    });
  });

  describe('update', () => {
    it('should update a ${pascalCaseName}', async () => {
      const ${camelCaseName}Mock = {
        id: '5',
        name: '${pascalCaseName} name',
        creationDate: new Date(),
        updateDate: new Date(),
        deactivationDate: null
      };

      const updateResultMock = {
        identifiers: [],
        generatedMaps: [],
        raw: null
      };

      const ${camelCaseName}UpdateRequest = {
        name: 'Updated'
      };

      when(${camelCaseName}RepositoryMock.findById(anything())).thenResolve(${camelCaseName}Mock);

      when(${camelCaseName}RepositoryMock.update(anything())).thenResolve(updateResultMock);

      await ${camelCaseName}Service.update(${camelCaseName}Mock.id, ${camelCaseName}UpdateRequest);

      verify(${camelCaseName}RepositoryMock.findById(anything())).called();

      verify(${camelCaseName}RepositoryMock.update(anything())).called();
    });

    it('should return not found error', async () => {
      const id = '5';

      const ${camelCaseName}UpdateRequest = {
        name: 'Updated'
      };

      when(${camelCaseName}RepositoryMock.findById(anything())).thenResolve(null);

      await expect(${camelCaseName}Service.update(id, ${camelCaseName}UpdateRequest)).rejects.toThrow();

      verify(${camelCaseName}RepositoryMock.findById(anything())).called();
      verify(${camelCaseName}RepositoryMock.update(anything())).never();
    });
  });

  describe('disable', () => {
    it('should disable a ${pascalCaseName}', async () => {
      const ${camelCaseName}Mock = {
        id: '5',
        name: '${pascalCaseName} name',
        creationDate: new Date(),
        updateDate: new Date(),
        deactivationDate: null
      };

      const updateResultMock = {
        identifiers: [],
        generatedMaps: [],
        raw: null
      };

      when(${camelCaseName}RepositoryMock.findById(anything())).thenResolve(${camelCaseName}Mock);

      when(${camelCaseName}RepositoryMock.update(anything())).thenResolve(updateResultMock);

      await ${camelCaseName}Service.disable(${camelCaseName}Mock.id);

      verify(${camelCaseName}RepositoryMock.findById(anything())).called();

      verify(${camelCaseName}RepositoryMock.update(anything())).called();
    });

    it('should return not found error', async () => {
      const id = '5';

      when(${camelCaseName}RepositoryMock.findById(anything())).thenResolve(null);

      await expect(${camelCaseName}Service.disable(id)).rejects.toThrow();

      verify(${camelCaseName}RepositoryMock.findById(anything())).called();
      verify(${camelCaseName}RepositoryMock.update(anything())).never();
    });
  });

  describe('findById', () => {
    it('should find a ${pascalCaseName}', async () => {
      const ${camelCaseName}Mock = {
        id: '5',
        name: '${pascalCaseName} name',
        creationDate: new Date(),
        updateDate: new Date(),
        deactivationDate: null
      };

      when(${camelCaseName}RepositoryMock.findById(anything())).thenResolve(${camelCaseName}Mock);

      const output = await ${camelCaseName}Service.findById(${camelCaseName}Mock.id);

      expect(output).toEqual({
        name: ${camelCaseName}Mock.name,
        creationDate: ${camelCaseName}Mock.creationDate,
        updateDate: ${camelCaseName}Mock.updateDate,
        deactivationDate: ${camelCaseName}Mock.deactivationDate
      });

      verify(${camelCaseName}RepositoryMock.findById(anything())).called();
    });

    it('should return not found error', async () => {
      const id = '5';

      when(${camelCaseName}RepositoryMock.findById(anything())).thenResolve(null);

      await expect(${camelCaseName}Service.findById(id)).rejects.toThrow();

      verify(${camelCaseName}RepositoryMock.findById(anything())).called();
    });
  });

  describe('toList', () => {
    it('should find a ${pascalCaseName}', async () => {
      const itemsMock: [${pascalCaseName}Entity[], number] = [
        [
          {
            id: '5',
            name: '${pascalCaseName} name',
            creationDate: new Date(),
            updateDate: new Date(),
            deactivationDate: null
          }
        ],
        1
      ];

      const ${camelCaseName}ListingRequest = {
        page: 0,
        pageSize: 100,
        orderColumn: null,
        orderDirection: null
      };

      when(${camelCaseName}RepositoryMock.toList(anything())).thenResolve(itemsMock);

      const output = await ${camelCaseName}Service.toList(${camelCaseName}ListingRequest);

      expect(output).toEqual({
        rows: expect.any(Array),
        count: expect.any(Number)
      });

      verify(${camelCaseName}RepositoryMock.toList(anything())).called();
    });
  });

  describe('delete', () => {
    it('should delete a ${pascalCaseName}', async () => {
      const id = '5';

      when(${camelCaseName}RepositoryMock.delete(anything())).thenResolve();

      await ${camelCaseName}Service.delete(id);

      verify(${camelCaseName}RepositoryMock.delete(anything())).called();
    });
  });
});
`;
}

export { getServiceTestTemplate };