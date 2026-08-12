import fs from 'fs';
import path from 'path';

const baseDir = path.resolve('d:/project/Techzon IT Solutions/backend/src');
const validationsDir = path.join(baseDir, 'validations');
const routesDir = path.join(baseDir, 'routes');
const servicesDir = path.join(baseDir, 'services');

if (!fs.existsSync(validationsDir)) fs.mkdirSync(validationsDir, { recursive: true });
if (!fs.existsSync(routesDir)) fs.mkdirSync(routesDir, { recursive: true });
if (!fs.existsSync(servicesDir)) fs.mkdirSync(servicesDir, { recursive: true });

const models = [
  'Category', 'Service', 'Portfolio', 'Blog', 'Team',
  'Testimonial', 'Career', 'Application', 'Contact',
  'Newsletter', 'Settings', 'SEO', 'Analytics', 'FAQ'
];

let indexRoutesCode = `import express from 'express';
import { getHealthStatus } from '../controllers/healthController.js';
import authRoutes from './authRoutes.js';
`;

models.forEach((model) => {
  const modelLower = model.toLowerCase();
  
  // 1. Generate Validation
  const validationCode = `import Joi from 'joi';

export const ${modelLower}Schema = Joi.object({
  // Generic open validation for generation (can be restricted later per model)
}).unknown(true);
`;
  fs.writeFileSync(path.join(validationsDir, `${modelLower}Validation.js`), validationCode);

  // 2. Generate Service
  const serviceCode = `import ${model} from '../models/${model}.js';
import { BaseService } from './BaseService.js';

class ${model}Service extends BaseService {
  constructor() {
    super(${model});
  }
}

export const ${modelLower}Service = new ${model}Service();
`;
  fs.writeFileSync(path.join(servicesDir, `${modelLower}Service.js`), serviceCode);

  // 3. Generate Route
  const routeCode = `import express from 'express';
import { createOne, getAll, getOne, updateOne, deleteOne, bulkDelete, bulkUpdateStatus } from '../controllers/factoryController.js';
import { ${modelLower}Service } from '../services/${modelLower}Service.js';
import { ${modelLower}Schema } from '../validations/${modelLower}Validation.js';
import { protect, authorize } from '../middlewares/auth.js';

const router = express.Router();

// Public READ routes
router.get('/', getAll(${modelLower}Service));
router.get('/:id', getOne(${modelLower}Service));

// Protected Admin routes
router.use(protect);
router.use(authorize('admin', 'superadmin'));

router.post('/', createOne(${modelLower}Service, ${modelLower}Schema));
router.patch('/:id', updateOne(${modelLower}Service, ${modelLower}Schema));
router.delete('/:id', deleteOne(${modelLower}Service));
router.post('/bulk-delete', bulkDelete(${modelLower}Service));
router.patch('/bulk-status', bulkUpdateStatus(${modelLower}Service));

export default router;
`;
  fs.writeFileSync(path.join(routesDir, `${modelLower}Routes.js`), routeCode);

  indexRoutesCode += `import ${modelLower}Routes from './${modelLower}Routes.js';\n`;
});

// Finalize index.js router mounting
indexRoutesCode += `
const router = express.Router();

router.get('/health', getHealthStatus);
router.use('/auth', authRoutes);
`;

models.forEach((model) => {
  const modelLower = model.toLowerCase();
  indexRoutesCode += `router.use('/${modelLower}s', ${modelLower}Routes);\n`;
});

indexRoutesCode += `\nexport default router;\n`;

fs.writeFileSync(path.join(routesDir, 'index.js'), indexRoutesCode);

console.log('Successfully generated all validations, services, routes, and mounted them to index.js');
