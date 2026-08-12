import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseDir = path.resolve('d:/project/Techzon IT Solutions/backend/src');
const modelsDir = path.join(baseDir, 'models');
const pluginsDir = path.join(baseDir, 'plugins');

if (!fs.existsSync(modelsDir)) fs.mkdirSync(modelsDir, { recursive: true });
if (!fs.existsSync(pluginsDir)) fs.mkdirSync(pluginsDir, { recursive: true });

// ---------------------------------------------
// 1. Mongoose Base Plugin (Reusable Pattern)
// ---------------------------------------------
const pluginCode = `import mongoose from 'mongoose';

export const basePlugin = (schema, options = {}) => {
  schema.add({
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
    createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', default: null },
    updatedBy: { type: mongoose.Schema.ObjectId, ref: 'User', default: null }
  });

  // Soft Delete Method
  schema.methods.softDelete = async function (userId = null) {
    this.isDeleted = true;
    this.deletedAt = new Date();
    if (userId) this.updatedBy = userId;
    return await this.save();
  };

  // Exclude soft-deleted items by default
  schema.pre(/^find/, function (next) {
    if (this.getQuery().isDeleted === undefined) {
      this.find({ isDeleted: { $ne: true } });
    }
    next();
  });

  // Query Helpers
  schema.query.active = function () {
    return this.where({ isDeleted: false });
  };
};
`;

fs.writeFileSync(path.join(pluginsDir, 'basePlugin.js'), pluginCode);

// ---------------------------------------------
// 2. Schema Generators
// ---------------------------------------------

const models = {
  Category: `import mongoose from 'mongoose';
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
export default mongoose.model('Category', categorySchema);`,

  Service: `import mongoose from 'mongoose';
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
export default mongoose.model('Service', serviceSchema);`,

  Portfolio: `import mongoose from 'mongoose';
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
export default mongoose.model('Portfolio', portfolioSchema);`,

  Blog: `import mongoose from 'mongoose';
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
export default mongoose.model('Blog', blogSchema);`,

  Team: `import mongoose from 'mongoose';
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
export default mongoose.model('Team', teamSchema);`,

  Testimonial: `import mongoose from 'mongoose';
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
export default mongoose.model('Testimonial', testimonialSchema);`,

  Career: `import mongoose from 'mongoose';
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
export default mongoose.model('Career', careerSchema);`,

  Application: `import mongoose from 'mongoose';
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
export default mongoose.model('Application', applicationSchema);`,

  Contact: `import mongoose from 'mongoose';
import { basePlugin } from '../plugins/basePlugin.js';

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['unread', 'read', 'replied'], default: 'unread', index: true }
}, { timestamps: true });

contactSchema.plugin(basePlugin);
export default mongoose.model('Contact', contactSchema);`,

  Newsletter: `import mongoose from 'mongoose';
import { basePlugin } from '../plugins/basePlugin.js';

const newsletterSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, index: true },
  isActive: { type: Boolean, default: true },
  subscribedAt: { type: Date, default: Date.now }
}, { timestamps: true });

newsletterSchema.plugin(basePlugin);
export default mongoose.model('Newsletter', newsletterSchema);`,

  Settings: `import mongoose from 'mongoose';
import { basePlugin } from '../plugins/basePlugin.js';

const settingsSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true, index: true },
  value: { type: mongoose.Schema.Types.Mixed, required: true },
  group: { type: String, required: true, index: true }
}, { timestamps: true });

settingsSchema.plugin(basePlugin);
export default mongoose.model('Settings', settingsSchema);`,

  SEO: `import mongoose from 'mongoose';
import { basePlugin } from '../plugins/basePlugin.js';

const seoSchema = new mongoose.Schema({
  pageRoute: { type: String, required: true, unique: true, index: true },
  metaTitle: { type: String, required: true },
  metaDescription: { type: String, required: true },
  keywords: [{ type: String }],
  ogImage: { type: String }
}, { timestamps: true });

seoSchema.plugin(basePlugin);
export default mongoose.model('SEO', seoSchema);`,

  Analytics: `import mongoose from 'mongoose';

// Analytics generally don't need soft deletes, so we skip basePlugin
const analyticsSchema = new mongoose.Schema({
  eventType: { type: String, required: true, index: true },
  page: { type: String, required: true, index: true },
  userAgent: { type: String },
  ipAddress: { type: String },
  data: { type: mongoose.Schema.Types.Mixed }
}, { timestamps: true });

// TTL Index to automatically clean up old analytics after 90 days
analyticsSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 90 });

export default mongoose.model('Analytics', analyticsSchema);`,

  FAQ: `import mongoose from 'mongoose';
import { basePlugin } from '../plugins/basePlugin.js';

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  category: { type: mongoose.Schema.ObjectId, ref: 'Category', index: true },
  order: { type: Number, default: 0 },
  status: { type: String, enum: ['draft', 'published'], default: 'published' }
}, { timestamps: true });

faqSchema.plugin(basePlugin);
export default mongoose.model('FAQ', faqSchema);`
};

for (const [modelName, code] of Object.entries(models)) {
  fs.writeFileSync(path.join(modelsDir, `${modelName}.js`), code);
}
console.log('Successfully generated all models and base plugin.');
