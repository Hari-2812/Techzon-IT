import express from 'express';
import { getHealthStatus } from '../controllers/healthController.js';
import authRoutes from './authRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import serviceRoutes from './serviceRoutes.js';
import portfolioRoutes from './portfolioRoutes.js';
import blogRoutes from './blogRoutes.js';
import teamRoutes from './teamRoutes.js';
import testimonialRoutes from './testimonialRoutes.js';
import careerRoutes from './careerRoutes.js';
import applicationRoutes from './applicationRoutes.js';
import contactRoutes from './contactRoutes.js';
import newsletterRoutes from './newsletterRoutes.js';
import settingsRoutes from './settingsRoutes.js';
import seoRoutes from './seoRoutes.js';
import analyticsRoutes from './analyticsRoutes.js';
import faqRoutes from './faqRoutes.js';

const router = express.Router();

router.get('/health', getHealthStatus);
router.use('/auth', authRoutes);
router.use('/categorys', categoryRoutes);
router.use('/services', serviceRoutes);
router.use('/portfolios', portfolioRoutes);
router.use('/blogs', blogRoutes);
router.use('/teams', teamRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/careers', careerRoutes);
router.use('/applications', applicationRoutes);
router.use('/contacts', contactRoutes);
router.use('/newsletters', newsletterRoutes);
router.use('/settingss', settingsRoutes);
router.use('/seos', seoRoutes);
router.use('/analyticss', analyticsRoutes);
router.use('/faqs', faqRoutes);

export default router;
