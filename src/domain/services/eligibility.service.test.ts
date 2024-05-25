import 'reflect-metadata';
import { EligibilityService } from './eligibility.service';
import { ContainerConfig } from '../../infrastructure/configs/container.config';

describe('EligibilityService', () => {
  let eligibilityService: EligibilityService;

  beforeEach(() => {
    ContainerConfig.start();
    eligibilityService = new EligibilityService();
  });

  describe('verify', () => {
    it('should return eligibility true with valid input as single phase', async () => {});
  });
});
