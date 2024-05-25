import 'reflect-metadata';
import request from 'supertest';
import { Application } from 'express';
import { Bootstraper } from '..';

describe('EligibilityController', () => {
  let app: Application;

  beforeAll(async () => {
    // app = await Bootstraper.start();
  });

  describe('POST /eligibility/verification', () => {
    it('should return eligibility true with expected data', async () => {});
  });
});
