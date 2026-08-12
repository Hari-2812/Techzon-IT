import mongoose from 'mongoose';
import { basePlugin } from '../plugins/basePlugin.js';

const portfolioSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, index: true },
  description: { type: String, required: true },
  client: { type: String },
  duration: { type: String },
  completionDate: { type: Date },
  images: [{ type: String }],
  category: { type: mongoose.Schema.ObjectId, ref: 'Category' },
  tags: [{ type: String }],
  link: { type: String },
  status: { type: String, enum: ['draft', 'published'], default: 'published' }
}, { timestamps: true });

portfolioSchema.plugin(basePlugin);
export default mongoose.model('Portfolio', portfolioSchema);