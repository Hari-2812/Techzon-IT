import Application from '../models/Application.js';
import { BaseService } from './BaseService.js';

class ApplicationService extends BaseService {
  constructor() {
    super(Application);
  }
}

export const applicationService = new ApplicationService();
