import express from 'express';
import { createOne, getAll, getOne, updateOne, deleteOne, bulkDelete, bulkUpdateStatus } from '../controllers/factoryController.js';
import { testimonialService } from '../services/testimonialService.js';
import { testimonialSchema } from '../validations/testimonialValidation.js';
import { protect, authorize } from '../middlewares/auth.js';

const router = express.Router();

// Public READ routes
router.get('/', getAll(testimonialService));
router.get('/:id', getOne(testimonialService));

// Protected Admin routes
router.use(protect);
router.use(authorize('admin', 'superadmin'));

router.post('/', createOne(testimonialService, testimonialSchema));
router.patch('/:id', updateOne(testimonialService, testimonialSchema));
router.delete('/:id', deleteOne(testimonialService));
router.post('/bulk-delete', bulkDelete(testimonialService));
router.patch('/bulk-status', bulkUpdateStatus(testimonialService));

export default router;
