import express from 'express';
import { createOne, getAll, getOne, updateOne, deleteOne, bulkDelete, bulkUpdateStatus } from '../controllers/factoryController.js';
import { faqService } from '../services/faqService.js';
import { faqSchema } from '../validations/faqValidation.js';
import { protect, authorize } from '../middlewares/auth.js';

const router = express.Router();

// Public READ routes
router.get('/', getAll(faqService));
router.get('/:id', getOne(faqService));

// Protected Admin routes
router.use(protect);
router.use(authorize('admin', 'superadmin'));

router.post('/', createOne(faqService, faqSchema));
router.patch('/:id', updateOne(faqService, faqSchema));
router.delete('/:id', deleteOne(faqService));
router.post('/bulk-delete', bulkDelete(faqService));
router.patch('/bulk-status', bulkUpdateStatus(faqService));

export default router;
