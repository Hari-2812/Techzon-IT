import Joi from 'joi';
import dotenv from 'dotenv';
import logger from '../utils/logger.js';

// Load .env first
dotenv.config();

const envSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  PORT: Joi.number().default(5000),
  MONGO_URI: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().default('15m'),
  JWT_REFRESH_SECRET: Joi.string().required(),
  JWT_REFRESH_EXPIRES_IN: Joi.string().default('7d'),
  CLIENT_URL: Joi.string().uri().required(),
  CLOUDINARY_CLOUD_NAME: Joi.string().allow(''),
  CLOUDINARY_API_KEY: Joi.string().allow(''),
  CLOUDINARY_API_SECRET: Joi.string().allow(''),
  BREVO_API_KEY: Joi.string().allow(''),
}).unknown(true);

const { error, value: envVars } = envSchema.validate(process.env, { abortEarly: false });

if (error) {
  logger.error(`Environment validation error: ${error.message}`);
  process.exit(1);
}

export const env = {
  nodeEnv: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoUri: envVars.MONGO_URI,
  jwt: {
    secret: envVars.JWT_SECRET,
    expiresIn: envVars.JWT_EXPIRES_IN,
    refreshSecret: envVars.JWT_REFRESH_SECRET,
    refreshExpiresIn: envVars.JWT_REFRESH_EXPIRES_IN,
  },
  clientUrl: envVars.CLIENT_URL,
  cloudinary: {
    cloudName: envVars.CLOUDINARY_CLOUD_NAME,
    apiKey: envVars.CLOUDINARY_API_KEY,
    apiSecret: envVars.CLOUDINARY_API_SECRET,
  },
  brevo: {
    host: envVars.BREVO_HOST || 'smtp-relay.brevo.com',
    port: envVars.BREVO_PORT || 587,
    user: envVars.BREVO_USER,
    pass: envVars.BREVO_PASS || envVars.BREVO_API_KEY,
  },
  appName: envVars.APP_NAME || 'Techzon IT Solutions',
};
