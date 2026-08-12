import mongoose from 'mongoose';
import { basePlugin } from '../plugins/basePlugin.js';

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  position: { type: String, required: true },
  bio: { type: String },
  image: { type: String },
  socialLinks: {
    facebook: String,
    twitter: String,
    linkedin: String,
    instagram: String
  },
  order: { type: Number, default: 0 },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });

teamSchema.plugin(basePlugin);
export default mongoose.model('Team', teamSchema);