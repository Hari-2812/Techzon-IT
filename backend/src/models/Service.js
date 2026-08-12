import mongoose from 'mongoose';
import { basePlugin } from '../plugins/basePlugin.js';

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, index: true },
  shortDescription: { type: String, required: true },
  content: { type: String, required: true },
  icon: { type: String },
  image: { type: String },
  features: [{ type: String }],
  category: { type: mongoose.Schema.ObjectId, ref: 'Category' },
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft', index: true },
  metaTitle: { type: String },
  metaDescription: { type: String }
}, { timestamps: true });

serviceSchema.plugin(basePlugin);
export default mongoose.model('Service', serviceSchema);