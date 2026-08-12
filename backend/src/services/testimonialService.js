import Testimonial from '../models/Testimonial.js';
import { BaseService } from './BaseService.js';

class TestimonialService extends BaseService {
  constructor() {
    super(Testimonial);
  }
}

export const testimonialService = new TestimonialService();
