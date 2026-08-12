import express from 'express';
import { getAll, getOne, updateOne, deleteOne, bulkDelete, bulkUpdateStatus } from '../controllers/factoryController.js';
import { contactService } from '../services/contactService.js';
import { contactSchema } from '../validations/contactValidation.js';
import { createContact } from '../controllers/contactController.js';
import { protect, authorize } from '../middlewares/auth.js';

const router = express.Router();

// Public READ routes
router.get('/', getAll(contactService));
router.get('/:id', getOne(contactService));

// Public write routes
router.post('/', createContact);

// Protected Admin routes
router.use(protect);
router.use(authorize('admin', 'superadmin'));

router.patch('/:id', updateOne(contactService, contactSchema));
router.delete('/:id', deleteOne(contactService));
router.post('/bulk-delete', bulkDelete(contactService));
router.patch('/bulk-status', bulkUpdateStatus(contactService));

export default router;
