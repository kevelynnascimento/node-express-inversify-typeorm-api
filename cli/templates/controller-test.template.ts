const getControllerTestTemplate = (name: string, camelCaseName: string, pascalCaseName: string): string => {
  return `
import 'reflect-metadata';
import request from 'supertest';
import { Application } from 'express';
import * as dotenv from 'dotenv';
import { Bootstraper } from '../..';
import { AuthHelper } from '../../infrastructure/helpers/auth.helper';

dotenv.config();

describe('${pascalCaseName}Controller', () => {
  let app: Application;
  let token: string;
  let id: string;

  beforeAll(async () => {
    app = await Bootstraper.start();
    token = AuthHelper.generateToken({
      username: 'test',
      email: 'test',
      role: 'admin'
    });
  });

  describe('create', () => {
    it('should create a new ${pascalCaseName}', async () => {
      const body = {
        name: '${pascalCaseName} name'
      };

      const response = await request(app)
        .post(\`/api/${name}\`)
        .set('Authorization', \`Bearer \${token}\`)
        .send(body);

      expect(response.status).toBe(200);

      expect(response.body).toEqual({
        id: expect.any(String)
      });

      id = response.body.id;
    });
  });

  describe('update', () => {
    it('should update a ${pascalCaseName}', async () => {
      const body = {
        name: '${pascalCaseName} name'
      };

      const response = await request(app)
        .put(\`/api/${name}/\${id}\`)
        .set('Authorization', \`Bearer \${token}\`)
        .send(body);

      expect(response.status).toBe(200);
    });
  });

  describe('disable', () => {
    it('should disable a ${pascalCaseName}', async () => {
      const response = await request(app)
        .post(\`/api/${name}/\${id}/deactivation\`)
        .set('Authorization', \`Bearer \${token}\`)
        .send();

      expect(response.status).toBe(200);
    });
  });

  describe('findById', () => {
    it('should return a ${pascalCaseName}', async () => {
      const response = await request(app)
        .get(\`/api/${name}/\${id}/finding-one\`)
        .set('Authorization', \`Bearer \${token}\`)
        .send();

      expect(response.status).toBe(200);

      expect(response.body).toEqual({
        name: expect.any(String),
        creationDate: expect.any(String),
        updateDate: expect.any(String),
        deactivationDate: expect.any(String)
      });
    });
  });

  describe('toList', () => {
    it('should return a list', async () => {
      const response = await request(app)
        .get(\`/api/${name}/listing?page=0&pageSize=100\`)
        .set('Authorization', \`Bearer \${token}\`)
        .send();

      expect(response.status).toBe(200);

      expect(response.body).toEqual({
        rows: expect.any(Array),
        count: expect.any(Number)
      });
    });
  });

  describe('delete', () => {
    it('should delete a ${pascalCaseName}', async () => {
      const response = await request(app)
        .delete(\`/api/${name}/\${id}\`)
        .set('Authorization', \`Bearer \${token}\`)
        .send();

      expect(response.status).toBe(200);
    });
  });
});
`;
}

export { getControllerTestTemplate };