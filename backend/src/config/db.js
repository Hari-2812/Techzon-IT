import mongoose from 'mongoose';
import logger from '../utils/logger.js';
import { env } from './env.js';

const connectDB = async (retries = 5) => {
  while (retries > 0) {
    try {
      logger.info('Attempting to connect to MongoDB Atlas...');
      const conn = await mongoose.connect(env.mongoUri);
      logger.info(`MongoDB Connected: ${conn.connection.host}`);
      break;
    } catch (error) {
      retries -= 1;
      logger.error(`MongoDB connection failed. Retries left: ${retries}`);
      logger.error(`Error details: ${error.message}`);
      
      if (retries === 0) {
        logger.error('All retries exhausted. Shutting down application.');
        process.exit(1);
      }
      
      // Wait for 5 seconds before retrying
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
};

export default connectDB;
