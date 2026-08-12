import SEO from '../models/SEO.js';
import { BaseService } from './BaseService.js';

class SEOService extends BaseService {
  constructor() {
    super(SEO);
  }
}

export const seoService = new SEOService();
