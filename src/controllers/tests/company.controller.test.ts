import 'reflect-metadata';
import request from 'supertest';
import { Application } from 'express';
import * as dotenv from 'dotenv';
import { Bootstraper } from '../..';
import { AuthHelper } from '../../infrastructure/helpers/auth.helper';

dotenv.config();

describe('CompanyController', () => {
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
    it('should create a new company', async () => {
      const body = {
        name: 'Company name'
      };

      const response = await request(app)
        .post(`/api/companies`)
        .set('Authorization', `Bearer ${token}`)
        .send(body);

      expect(response.status).toBe(200);

      expect(response.body).toEqual({
        id: expect.any(String)
      });

      id = response.body.id;
    });
  });

  describe('update', () => {
    it('should update a company', async () => {
      const body = {
        name: 'Company name'
      };

      const response = await request(app)
        .put(`/api/companies/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(body);

      expect(response.status).toBe(200);
    });
  });

  describe('disable', () => {
    it('should disable a company', async () => {
      const response = await request(app)
        .post(`/api/companies/${id}/deactivation`)
        .set('Authorization', `Bearer ${token}`)
        .send();

      expect(response.status).toBe(200);
    });
  });

  describe('findById', () => {
    it('should return a company', async () => {
      const response = await request(app)
        .get(`/api/companies/${id}/finding-one`)
        .set('Authorization', `Bearer ${token}`)
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
        .get(`/api/companies/listing?page=0&pageSize=100`)
        .set('Authorization', `Bearer ${token}`)
        .send();

      expect(response.status).toBe(200);

      expect(response.body).toEqual({
        rows: expect.any(Array),
        count: expect.any(Number)
      });
    });
  });

  describe('delete', () => {
    it('should delete a company', async () => {
      const response = await request(app)
        .delete(`/api/companies/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send();

      expect(response.status).toBe(200);
    });
  });
});
