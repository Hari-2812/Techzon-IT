import express from 'express';
import { createOne, getAll, getOne, updateOne, deleteOne, bulkDelete, bulkUpdateStatus } from '../controllers/factoryController.js';
import { careerService } from '../services/careerService.js';
import { careerSchema } from '../validations/careerValidation.js';
import { protect, authorize } from '../middlewares/auth.js';

const router = express.Router();

// Public READ routes
router.get('/', getAll(careerService));
router.get('/:id', getOne(careerService));

// Protected Admin routes
router.use(protect);
router.use(authorize('admin', 'superadmin'));

router.post('/', createOne(careerService, careerSchema));
router.patch('/:id', updateOne(careerService, careerSchema));
router.delete('/:id', deleteOne(careerService));
router.post('/bulk-delete', bulkDelete(careerService));
router.patch('/bulk-status', bulkUpdateStatus(careerService));

export default router;
