import Career from '../models/Career.js';
import { BaseService } from './BaseService.js';

class CareerService extends BaseService {
  constructor() {
    super(Career);
  }
}

export const careerService = new CareerService();
