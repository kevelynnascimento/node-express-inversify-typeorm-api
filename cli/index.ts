import { Command } from 'commander';
import { promises as fs } from 'fs';
import path from 'path';
import { getEntityTemplate } from './templates/entity.template';
import { getRepositoryTemplate } from './templates/repository.template';
import { getServiceTemplate } from './templates/service.template';
import { getControllerTemplate } from './templates/controller.template';
import { getListingRequestTemplate } from './templates/listing-request.template';
import { getCreationRequestTemplate } from './templates/creation-request.template';
import { getCreationResponseTemplate } from './templates/creation-response.template';
import { getFindingByIdTemplate } from './templates/finding-by-id-response.template';
import { getListingResponseTemplate } from './templates/listing-response.template';
import { getUpdateRequestTemplate } from './templates/update-request.template';
import { getControllerTestTemplate } from './templates/controller-test.template';
import { getServiceTestTemplate } from './templates/service-test.template';

const program = new Command();

program
  .name('create-file')
  .description('CLI for creating new files TypeScript')
  .version('1.0.0');

const toPascalCase = (str: string): string => {
  return str.split('-').map(segment => segment.charAt(0).toUpperCase() + segment.slice(1)).join('');
};

const toCamelCase = (str: string): string => {
  return str.split('-').map((segment, index) => {
    return index === 0 ? segment : segment.charAt(0).toUpperCase() + segment.slice(1);
  }).join('');
};

const saveFile = async (filePath: string, template: string) => {
  try {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, template, 'utf8');
    console.log(`A new file was generated in ${filePath}.`);
  } catch (error) {
    console.error(`Erro while generating a new file in ${filePath}.`, error);
  }
}

const createEntity = async (name: string) => {
  const filePath = path.join(process.cwd(), `src/domain/entities/${name}.entity.ts`);

  const pascalCaseName = toPascalCase(name);

  const databaseTableName = name.replace('-', '_');

  const template = getEntityTemplate(databaseTableName, pascalCaseName);

  await saveFile(filePath, template);
};

const createRepository = async (name: string) => {
  const filePath = path.join(process.cwd(), `src/infrastructure/repositories/${name}.repository.ts`);

  const pascalCaseName = toPascalCase(name);

  const camelCaseName = toCamelCase(name);

  const template = getRepositoryTemplate(name, camelCaseName, pascalCaseName);

  await saveFile(filePath, template);
};

const createService = async (name: string) => {
  const filePath = path.join(process.cwd(), `src/domain/services/${name}.service.ts`);

  const pascalCaseName = toPascalCase(name);

  const camelCaseName = toCamelCase(name);

  const template = getServiceTemplate(name, camelCaseName, pascalCaseName);

  await saveFile(filePath, template);
};

const createController = async (name: string) => {
  const filePath = path.join(process.cwd(), `src/controllers/${name}.controller.ts`);

  const pascalCaseName = toPascalCase(name);

  const camelCaseName = toCamelCase(name);

  const template = getControllerTemplate(name, camelCaseName, pascalCaseName);

  await saveFile(filePath, template);
};

const createListingRequest = async (name: string) => {
  const filePath = path.join(process.cwd(), `src/domain/dtos/${name}/requests/${name}-listing.request.ts`);

  const pascalCaseName = toPascalCase(name);

  const template = getListingRequestTemplate(pascalCaseName);

  await saveFile(filePath, template);
};

const createCreationRequest = async (name: string) => {
  const filePath = path.join(process.cwd(), `src/domain/dtos/${name}/requests/${name}-creation.request.ts`);

  const pascalCaseName = toPascalCase(name);

  const template = getCreationRequestTemplate(pascalCaseName);

  await saveFile(filePath, template);
};

const createCreationResponse = async (name: string) => {
  const filePath = path.join(process.cwd(), `src/domain/dtos/${name}/responses/${name}-creation.response.ts`);

  const pascalCaseName = toPascalCase(name);

  const template = getCreationResponseTemplate(pascalCaseName);

  await saveFile(filePath, template);
};

const createFindingByIdResponse = async (name: string) => {
  const filePath = path.join(process.cwd(), `src/domain/dtos/${name}/responses/${name}-finding-by-id.response.ts`);

  const pascalCaseName = toPascalCase(name);

  const template = getFindingByIdTemplate(pascalCaseName);

  await saveFile(filePath, template);
};

const createListingResponse = async (name: string) => {
  const filePath = path.join(process.cwd(), `src/domain/dtos/${name}/responses/${name}-listing.response.ts`);

  const pascalCaseName = toPascalCase(name);

  const template = getListingResponseTemplate(pascalCaseName);

  await saveFile(filePath, template);
};

const createUpdateRequest = async (name: string) => {
  const filePath = path.join(process.cwd(), `src/domain/dtos/${name}/requests/${name}-update.request.ts`);

  const pascalCaseName = toPascalCase(name);

  const template = getUpdateRequestTemplate(pascalCaseName);

  await saveFile(filePath, template);
};

const createControllerTest = async (name: string) => {
  const filePath = path.join(process.cwd(), `src/controllers/tests/${name}.controller.test.ts`);

  const pascalCaseName = toPascalCase(name);

  const camelCaseName = toCamelCase(name);

  const template = getControllerTestTemplate(name, camelCaseName, pascalCaseName);

  await saveFile(filePath, template);
};

const createServiceTest = async (name: string) => {
  const filePath = path.join(process.cwd(), `src/domain/services/tests/${name}.service.test.ts`);

  const pascalCaseName = toPascalCase(name);

  const camelCaseName = toCamelCase(name);

  const template = getServiceTestTemplate(name, camelCaseName, pascalCaseName);

  await saveFile(filePath, template);
};

const createStructure = (name: string) => {
  createEntity(name);
  createRepository(name);
  createService(name);
  createController(name);
  createListingRequest(name);
  createCreationRequest(name);
  createCreationResponse(name);
  createFindingByIdResponse(name);
  createListingResponse(name);
  createUpdateRequest(name);
  createControllerTest(name);
  createServiceTest(name);
};

program
  .command('create <name>')
  .description('It creates a new structure')
  .action((name) => {
    createStructure(name);
  });

program.parse(process.argv);