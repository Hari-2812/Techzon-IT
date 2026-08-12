import mongoose from 'mongoose';
import { basePlugin } from '../plugins/basePlugin.js';

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['unread', 'read', 'replied'], default: 'unread', index: true }
}, { timestamps: true });

contactSchema.plugin(basePlugin);
export default mongoose.model('Contact', contactSchema);