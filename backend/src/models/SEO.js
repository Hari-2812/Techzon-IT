import mongoose from 'mongoose';
import { basePlugin } from '../plugins/basePlugin.js';

const seoSchema = new mongoose.Schema({
  pageRoute: { type: String, required: true, unique: true, index: true },
  metaTitle: { type: String, required: true },
  metaDescription: { type: String, required: true },
  keywords: [{ type: String }],
  ogImage: { type: String }
}, { timestamps: true });

seoSchema.plugin(basePlugin);
export default mongoose.model('SEO', seoSchema);