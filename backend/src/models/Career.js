import mongoose from 'mongoose';
import { basePlugin } from '../plugins/basePlugin.js';

const careerSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, index: true },
  department: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, enum: ['full-time', 'part-time', 'contract', 'freelance'], required: true },
  description: { type: String, required: true },
  requirements: [{ type: String }],
  responsibilities: [{ type: String }],
  isActive: { type: Boolean, default: true, index: true }
}, { timestamps: true });

careerSchema.plugin(basePlugin);
export default mongoose.model('Career', careerSchema);