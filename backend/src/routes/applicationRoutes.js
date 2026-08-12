import express from 'express';
import { createOne, getAll, getOne, updateOne, deleteOne, bulkDelete, bulkUpdateStatus } from '../controllers/factoryController.js';
import { applicationService } from '../services/applicationService.js';
import { applicationSchema } from '../validations/applicationValidation.js';
import { protect, authorize } from '../middlewares/auth.js';

const router = express.Router();

// Public READ routes
router.get('/', getAll(applicationService));
router.get('/:id', getOne(applicationService));

// Public write routes
router.post('/', createOne(applicationService, applicationSchema));

// Protected Admin routes
router.use(protect);
router.use(authorize('admin', 'superadmin'));

router.patch('/:id', updateOne(applicationService, applicationSchema));
router.delete('/:id', deleteOne(applicationService));
router.post('/bulk-delete', bulkDelete(applicationService));
router.patch('/bulk-status', bulkUpdateStatus(applicationService));

export default router;
