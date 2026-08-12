import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { newsletterService } from '../services/newsletterService.js';
import { emailService } from '../services/emailService.js';

export const subscribeNewsletter = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required.' });
  }

  // Handle duplicate subscriptions
  const existing = await newsletterService.model.findOne({ email });
  if (existing) {
    return res.status(200).json(new ApiResponse(200, existing, 'You\'re already subscribed to our updates.'));
  }

  // 1. Store subscription
  const doc = await newsletterService.create({ email }, req.user?.id);

  // 2. Send internal notification
  await emailService.sendNewsletterInternalNotification(email);

  // 3. Send subscriber confirmation
  await emailService.sendNewsletterSubscriberConfirmation(email);

  // 4. Return successful API response
  res.status(201).json(new ApiResponse(201, doc, 'You\'re successfully subscribed to our updates.'));
});
