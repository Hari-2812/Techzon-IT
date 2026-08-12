import mongoose from 'mongoose';

// Analytics generally don't need soft deletes, so we skip basePlugin
const analyticsSchema = new mongoose.Schema({
  eventType: { type: String, required: true, index: true },
  page: { type: String, required: true, index: true },
  userAgent: { type: String },
  ipAddress: { type: String },
  data: { type: mongoose.Schema.Types.Mixed }
}, { timestamps: true });

// TTL Index to automatically clean up old analytics after 90 days
analyticsSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 90 });

export default mongoose.model('Analytics', analyticsSchema);