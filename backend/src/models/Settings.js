import mongoose from 'mongoose';
import { basePlugin } from '../plugins/basePlugin.js';

const settingsSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true, index: true },
  value: { type: mongoose.Schema.Types.Mixed, required: true },
  group: { type: String, required: true, index: true }
}, { timestamps: true });

settingsSchema.plugin(basePlugin);
export default mongoose.model('Settings', settingsSchema);