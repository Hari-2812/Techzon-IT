import express from 'express';
import { createOne, getAll, getOne, updateOne, deleteOne, bulkDelete, bulkUpdateStatus } from '../controllers/factoryController.js';
import { categoryService } from '../services/categoryService.js';
import { categorySchema } from '../validations/categoryValidation.js';
import { protect, authorize } from '../middlewares/auth.js';

const router = express.Router();

// Public READ routes
router.get('/', getAll(categoryService));
router.get('/:id', getOne(categoryService));

// Protected Admin routes
router.use(protect);
router.use(authorize('admin', 'superadmin'));

router.post('/', createOne(categoryService, categorySchema));
router.patch('/:id', updateOne(categoryService, categorySchema));
router.delete('/:id', deleteOne(categoryService));
router.post('/bulk-delete', bulkDelete(categoryService));
router.patch('/bulk-status', bulkUpdateStatus(categoryService));

export default router;
