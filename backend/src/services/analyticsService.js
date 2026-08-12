import Analytics from '../models/Analytics.js';
import { BaseService } from './BaseService.js';

class AnalyticsService extends BaseService {
  constructor() {
    super(Analytics);
  }
}

export const analyticsService = new AnalyticsService();
