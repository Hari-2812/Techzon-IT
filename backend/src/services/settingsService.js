import Settings from '../models/Settings.js';
import { BaseService } from './BaseService.js';

class SettingsService extends BaseService {
  constructor() {
    super(Settings);
  }
}

export const settingsService = new SettingsService();
