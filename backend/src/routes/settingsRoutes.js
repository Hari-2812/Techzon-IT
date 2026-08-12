import express from 'express';
import { createOne, getAll, getOne, updateOne, deleteOne, bulkDelete, bulkUpdateStatus } from '../controllers/factoryController.js';
import { settingsService } from '../services/settingsService.js';
import { settingsSchema } from '../validations/settingsValidation.js';
import { protect, authorize } from '../middlewares/auth.js';

const router = express.Router();

// Public READ routes
router.get('/', getAll(settingsService));
router.get('/:id', getOne(settingsService));

// Protected Admin routes
router.use(protect);
router.use(authorize('admin', 'superadmin'));

router.post('/', createOne(settingsService, settingsSchema));
router.patch('/:id', updateOne(settingsService, settingsSchema));
router.delete('/:id', deleteOne(settingsService));
router.post('/bulk-delete', bulkDelete(settingsService));
router.patch('/bulk-status', bulkUpdateStatus(settingsService));

export default router;
