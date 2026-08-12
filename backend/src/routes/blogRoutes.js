import express from 'express';
import { createOne, getAll, getOne, updateOne, deleteOne, bulkDelete, bulkUpdateStatus } from '../controllers/factoryController.js';
import { blogService } from '../services/blogService.js';
import { blogSchema } from '../validations/blogValidation.js';
import { protect, authorize } from '../middlewares/auth.js';

const router = express.Router();

// Public READ routes
router.get('/', getAll(blogService));
router.get('/:id', getOne(blogService));

// Protected Admin routes
router.use(protect);
router.use(authorize('admin', 'superadmin'));

router.post('/', createOne(blogService, blogSchema));
router.patch('/:id', updateOne(blogService, blogSchema));
router.delete('/:id', deleteOne(blogService));
router.post('/bulk-delete', bulkDelete(blogService));
router.patch('/bulk-status', bulkUpdateStatus(blogService));

export default router;
