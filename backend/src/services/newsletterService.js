import Newsletter from '../models/Newsletter.js';
import { BaseService } from './BaseService.js';

class NewsletterService extends BaseService {
  constructor() {
    super(Newsletter);
  }
}

export const newsletterService = new NewsletterService();
