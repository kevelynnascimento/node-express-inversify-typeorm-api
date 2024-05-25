import 'reflect-metadata';
import request from 'supertest';
import { Application } from 'express';
import { Bootstraper } from '..';

describe('UserController', () => {
  let app: Application;
  let token: string;

  beforeAll(async () => {
    app = await Bootstraper.start(true);
  });

  describe('POST /users', () => {
    it('should create a user', async () => {
      const bodyRequest = {
        name: 'Test User',
        email: 'test@example.com',
        username: 'test',
        password: '123',
        role: 'admin'
      };

      const response = await request(app)
        .post('/api/users')
        .send(bodyRequest);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: expect.any(String)
      });

      token = response.body.token;
    });
  });

  describe('POST /users/login', () => {
    it('should return a token', async () => {
      const bodyRequest = {
        username: 'test',
        password: '123'
      };

      const response = await request(app)
        .post('/api/users/login')
        .send(bodyRequest);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        token: expect.any(String)
      });
    });
  });
});