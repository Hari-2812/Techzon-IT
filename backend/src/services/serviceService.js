import Service from '../models/Service.js';
import { BaseService } from './BaseService.js';

class ServiceService extends BaseService {
  constructor() {
    super(Service);
  }
}

export const serviceService = new ServiceService();
