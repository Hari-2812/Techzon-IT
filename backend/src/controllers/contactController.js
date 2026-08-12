import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { contactService } from '../services/contactService.js';
import { emailService } from '../services/emailService.js';
import { contactSchema } from '../validations/contactValidation.js';

export const createContact = [
  asyncHandler(async (req, res, next) => {
    // Validate request
    if (contactSchema) {
      const { error } = contactSchema.validate(req.body, { abortEarly: false, allowUnknown: true });
      if (error) {
        const errorMessages = error.details.map((detail) => detail.message);
        return res.status(400).json({ success: false, message: 'Validation Error', errors: errorMessages });
      }
    }
    
    if (!req.body.name || !req.body.email || !req.body.message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
    }
    next();
  }),
  asyncHandler(async (req, res) => {
    // 1. Store request in DB
    const doc = await contactService.create(req.body, req.user?.id);
    
    // 2. Send internal email to support@techzonwide.com
    await emailService.sendContactInternalNotification(req.body);
    
    // 3. Send confirmation email to client
    await emailService.sendContactClientConfirmation(req.body.email, req.body.name);
    
    // 4. Return successful API response
    res.status(201).json(new ApiResponse(201, doc, 'Your project request has been submitted successfully.'));
  })
];
