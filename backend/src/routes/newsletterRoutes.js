import express from 'express';
import { getAll, getOne, updateOne, deleteOne, bulkDelete, bulkUpdateStatus } from '../controllers/factoryController.js';
import { newsletterService } from '../services/newsletterService.js';
import { subscribeNewsletter } from '../controllers/newsletterController.js';
import { newsletterSchema } from '../validations/newsletterValidation.js';
import { protect, authorize } from '../middlewares/auth.js';

const router = express.Router();

// Public READ routes
router.get('/', getAll(newsletterService));
router.get('/:id', getOne(newsletterService));

// Public write routes
router.post('/', subscribeNewsletter);

// Protected Admin routes
router.use(protect);
router.use(authorize('admin', 'superadmin'));

router.patch('/:id', updateOne(newsletterService, newsletterSchema));
router.delete('/:id', deleteOne(newsletterService));
router.post('/bulk-delete', bulkDelete(newsletterService));
router.patch('/bulk-status', bulkUpdateStatus(newsletterService));

export default router;
