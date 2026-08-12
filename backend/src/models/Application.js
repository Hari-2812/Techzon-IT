import mongoose from 'mongoose';
import { basePlugin } from '../plugins/basePlugin.js';

const applicationSchema = new mongoose.Schema({
  career: { type: mongoose.Schema.ObjectId, ref: 'Career', required: true, index: true },
  applicantName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  resumeUrl: { type: String, required: true },
  coverLetter: { type: String },
  status: { type: String, enum: ['new', 'reviewed', 'shortlisted', 'rejected'], default: 'new', index: true }
}, { timestamps: true });

applicationSchema.plugin(basePlugin);
export default mongoose.model('Application', applicationSchema);