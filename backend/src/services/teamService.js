import Team from '../models/Team.js';
import { BaseService } from './BaseService.js';

class TeamService extends BaseService {
  constructor() {
    super(Team);
  }
}

export const teamService = new TeamService();
