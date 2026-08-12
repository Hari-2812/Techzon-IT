import express from 'express';
import { createOne, getAll, getOne, updateOne, deleteOne, bulkDelete, bulkUpdateStatus } from '../controllers/factoryController.js';
import { teamService } from '../services/teamService.js';
import { teamSchema } from '../validations/teamValidation.js';
import { protect, authorize } from '../middlewares/auth.js';

const router = express.Router();

// Public READ routes
router.get('/', getAll(teamService));
router.get('/:id', getOne(teamService));

// Protected Admin routes
router.use(protect);
router.use(authorize('admin', 'superadmin'));

router.post('/', createOne(teamService, teamSchema));
router.patch('/:id', updateOne(teamService, teamSchema));
router.delete('/:id', deleteOne(teamService));
router.post('/bulk-delete', bulkDelete(teamService));
router.patch('/bulk-status', bulkUpdateStatus(teamService));

export default router;
