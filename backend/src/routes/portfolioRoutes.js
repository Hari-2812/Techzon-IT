import express from 'express';
import { createOne, getAll, getOne, updateOne, deleteOne, bulkDelete, bulkUpdateStatus } from '../controllers/factoryController.js';
import { portfolioService } from '../services/portfolioService.js';
import { portfolioSchema } from '../validations/portfolioValidation.js';
import { protect, authorize } from '../middlewares/auth.js';

const router = express.Router();

// Public READ routes
router.get('/', getAll(portfolioService));
router.get('/:id', getOne(portfolioService));

// Protected Admin routes
router.use(protect);
router.use(authorize('admin', 'superadmin'));

router.post('/', createOne(portfolioService, portfolioSchema));
router.patch('/:id', updateOne(portfolioService, portfolioSchema));
router.delete('/:id', deleteOne(portfolioService));
router.post('/bulk-delete', bulkDelete(portfolioService));
router.patch('/bulk-status', bulkUpdateStatus(portfolioService));

export default router;
