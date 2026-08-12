import mongoose from 'mongoose';
import { basePlugin } from '../plugins/basePlugin.js';

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  category: { type: mongoose.Schema.ObjectId, ref: 'Category', index: true },
  order: { type: Number, default: 0 },
  status: { type: String, enum: ['draft', 'published'], default: 'published' }
}, { timestamps: true });

faqSchema.plugin(basePlugin);
export default mongoose.model('FAQ', faqSchema);