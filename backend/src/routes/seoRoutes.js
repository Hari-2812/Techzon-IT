import express from 'express';
import { createOne, getAll, getOne, updateOne, deleteOne, bulkDelete, bulkUpdateStatus } from '../controllers/factoryController.js';
import { seoService } from '../services/seoService.js';
import { seoSchema } from '../validations/seoValidation.js';
import { protect, authorize } from '../middlewares/auth.js';

const router = express.Router();

// Public READ routes
router.get('/', getAll(seoService));
router.get('/:id', getOne(seoService));

// Protected Admin routes
router.use(protect);
router.use(authorize('admin', 'superadmin'));

router.post('/', createOne(seoService, seoSchema));
router.patch('/:id', updateOne(seoService, seoSchema));
router.delete('/:id', deleteOne(seoService));
router.post('/bulk-delete', bulkDelete(seoService));
router.patch('/bulk-status', bulkUpdateStatus(seoService));

export default router;
