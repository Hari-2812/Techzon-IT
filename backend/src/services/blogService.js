import Blog from '../models/Blog.js';
import { BaseService } from './BaseService.js';

class BlogService extends BaseService {
  constructor() {
    super(Blog);
  }
}

export const blogService = new BlogService();
