import Contact from '../models/Contact.js';
import { BaseService } from './BaseService.js';

class ContactService extends BaseService {
  constructor() {
    super(Contact);
  }
}

export const contactService = new ContactService();
