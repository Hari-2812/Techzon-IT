import mongoose from 'mongoose';
import { basePlugin } from '../plugins/basePlugin.js';

const testimonialSchema = new mongoose.Schema({
  clientName: { type: String, required: true, trim: true },
  position: { type: String },
  company: { type: String },
  content: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  image: { type: String },
  isFeatured: { type: Boolean, default: false, index: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
}, { timestamps: true });

testimonialSchema.plugin(basePlugin);
export default mongoose.model('Testimonial', testimonialSchema);