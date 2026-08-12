import Portfolio from '../models/Portfolio.js';
import { BaseService } from './BaseService.js';

class PortfolioService extends BaseService {
  constructor() {
    super(Portfolio);
  }
}

export const portfolioService = new PortfolioService();
