import { env } from './config/env.js';
import app from './app.js';
import connectDB from './config/db.js';
import logger from './utils/logger.js';
import mongoose from 'mongoose';

const PORT = env.port;

// Connect to Database, then start server
connectDB().then(() => {
  const server = app.listen(PORT, () => {
    logger.info(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });

  // Handle unhandled promise rejections gracefully
  process.on('unhandledRejection', (err) => {
    logger.error(`UNHANDLED REJECTION! Shutting down... ${err.name}: ${err.message}`);
    server.close(async () => {
      await mongoose.connection.close();
      process.exit(1);
    });
  });

  // Graceful shutdown on SIGTERM / SIGINT
  const gracefulShutdown = async () => {
    logger.info('Received shutdown signal. Closing HTTP server and database connection...');
    server.close(async () => {
      await mongoose.connection.close();
      logger.info('Closed all connections. Process exiting now.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', gracefulShutdown);
  process.on('SIGINT', gracefulShutdown);
});
