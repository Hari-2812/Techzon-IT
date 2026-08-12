import mongoose from 'mongoose';
import { basePlugin } from '../plugins/basePlugin.js';

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  slug: { type: String, required: true, unique: true, lowercase: true, index: true },
  description: { type: String, trim: true },
  image: { type: String },
  parentCategory: { type: mongoose.Schema.ObjectId, ref: 'Category', default: null },
  type: { type: String, enum: ['blog', 'portfolio', 'service'], required: true, index: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });

categorySchema.plugin(basePlugin);
export default mongoose.model('Category', categorySchema);