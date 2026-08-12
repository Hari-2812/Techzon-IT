import express from 'express';
import { createOne, getAll, getOne, updateOne, deleteOne, bulkDelete, bulkUpdateStatus } from '../controllers/factoryController.js';
import { analyticsService } from '../services/analyticsService.js';
import { analyticsSchema } from '../validations/analyticsValidation.js';
import { protect, authorize } from '../middlewares/auth.js';

const router = express.Router();

// Public READ routes
router.get('/', getAll(analyticsService));
router.get('/:id', getOne(analyticsService));

// Protected Admin routes
router.use(protect);
router.use(authorize('admin', 'superadmin'));

router.post('/', createOne(analyticsService, analyticsSchema));
router.patch('/:id', updateOne(analyticsService, analyticsSchema));
router.delete('/:id', deleteOne(analyticsService));
router.post('/bulk-delete', bulkDelete(analyticsService));
router.patch('/bulk-status', bulkUpdateStatus(analyticsService));

export default router;
