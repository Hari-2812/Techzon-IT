import FAQ from '../models/FAQ.js';
import { BaseService } from './BaseService.js';

class FAQService extends BaseService {
  constructor() {
    super(FAQ);
  }
}

export const faqService = new FAQService();
