import Category from '../models/Category.js';
import { BaseService } from './BaseService.js';

class CategoryService extends BaseService {
  constructor() {
    super(Category);
  }
}

export const categoryService = new CategoryService();
