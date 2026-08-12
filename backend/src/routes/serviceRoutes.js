import express from 'express';
import { createOne, getAll, getOne, updateOne, deleteOne, bulkDelete, bulkUpdateStatus } from '../controllers/factoryController.js';
import { serviceService } from '../services/serviceService.js';
import { serviceSchema } from '../validations/serviceValidation.js';
import { protect, authorize } from '../middlewares/auth.js';

const router = express.Router();

// Public READ routes
router.get('/', getAll(serviceService));
router.get('/:id', getOne(serviceService));

// Protected Admin routes
router.use(protect);
router.use(authorize('admin', 'superadmin'));

router.post('/', createOne(serviceService, serviceSchema));
router.patch('/:id', updateOne(serviceService, serviceSchema));
router.delete('/:id', deleteOne(serviceService));
router.post('/bulk-delete', bulkDelete(serviceService));
router.patch('/bulk-status', bulkUpdateStatus(serviceService));

export default router;
