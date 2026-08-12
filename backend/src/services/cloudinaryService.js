import { v2 as cloudinary } from 'cloudinary';
import { env } from '../config/env.js';
import { ApiError } from '../utils/apiResponse.js';
import logger from '../utils/logger.js';
import fs from 'fs';

// Configuration
cloudinary.config({
  cloud_name: env.cloudinary.cloudName || 'mock_cloud',
  api_key: env.cloudinary.apiKey || 'mock_key',
  api_secret: env.cloudinary.apiSecret || 'mock_secret',
});

class CloudinaryService {
  /**
   * Upload an image or video to Cloudinary
   * @param {string} localFilePath - Path to local file
   * @param {string} folder - Destination folder
   */
  async uploadMedia(localFilePath, folder = 'techzon/general') {
    if (!localFilePath) throw new ApiError(400, 'No file path provided for upload');
    
    try {
      const response = await cloudinary.uploader.upload(localFilePath, {
        folder: folder,
        resource_type: 'auto',
        use_filename: true,
        unique_filename: true,
        overwrite: false,
      });
      
      // Clean up local temp file
      fs.unlinkSync(localFilePath);
      return response;
    } catch (error) {
      if (fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
      }
      logger.error('Cloudinary upload failed:', error);
      throw new ApiError(500, 'Failed to upload media to cloud storage', { cause: error });
    }
  }

  /**
   * Delete media from Cloudinary
   * @param {string} publicId - Cloudinary public ID
   */
  async deleteMedia(publicId) {
    if (!publicId) return null;
    
    try {
      const response = await cloudinary.uploader.destroy(publicId);
      return response;
    } catch (error) {
      logger.error('Cloudinary delete failed:', error);
      throw new ApiError(500, 'Failed to delete media from cloud storage', { cause: error });
    }
  }

  /**
   * Replace media (Delete old + Upload new)
   */
  async replaceMedia(oldPublicId, newLocalFilePath, folder) {
    if (oldPublicId) {
      await this.deleteMedia(oldPublicId);
    }
    return await this.uploadMedia(newLocalFilePath, folder);
  }
}

export const cloudinaryService = new CloudinaryService();
