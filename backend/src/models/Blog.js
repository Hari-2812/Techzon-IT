import mongoose from 'mongoose';
import { basePlugin } from '../plugins/basePlugin.js';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, index: true },
  content: { type: String, required: true },
  excerpt: { type: String },
  coverImage: { type: String },
  author: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  category: { type: mongoose.Schema.ObjectId, ref: 'Category', required: true },
  tags: [{ type: String }],
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft', index: true },
  views: { type: Number, default: 0 },
  publishedAt: { type: Date }
}, { timestamps: true });

blogSchema.plugin(basePlugin);
export default mongoose.model('Blog', blogSchema);