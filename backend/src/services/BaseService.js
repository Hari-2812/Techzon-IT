import { APIFeatures } from '../utils/apiFeatures.js';
import { ApiError } from '../utils/apiResponse.js';

export class BaseService {
  constructor(model, searchFields = ['name', 'title']) {
    this.model = model;
    this.searchFields = searchFields;
  }

  async getAll(queryString) {
    const features = new APIFeatures(this.model.find(), queryString)
      .filter()
      .search(this.searchFields)
      .sort()
      .limitFields()
      .paginate();
      
    const docs = await features.query;
    
    // Calculate total for pagination metadata
    const totalFeatures = new APIFeatures(this.model.find(), queryString)
      .filter()
      .search(this.searchFields);
    const total = await totalFeatures.query.countDocuments();
    
    return { docs, total };
  }

  async getOne(id, populateOptions = null) {
    let query = this.model.findById(id);
    if (populateOptions) query = query.populate(populateOptions);
    const doc = await query;
    if (!doc) throw new ApiError(404, 'Document not found');
    return doc;
  }

  async create(data, userId) {
    if (userId) {
      data.createdBy = userId;
    }
    return await this.model.create(data);
  }

  async update(id, data, userId) {
    if (userId) {
      data.updatedBy = userId;
    }
    const doc = await this.model.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    });
    if (!doc) throw new ApiError(404, 'Document not found');
    return doc;
  }

  async delete(id, userId) {
    const doc = await this.model.findById(id);
    if (!doc) throw new ApiError(404, 'Document not found');
    if (doc.softDelete) {
      await doc.softDelete(userId);
    } else {
      await doc.deleteOne();
    }
    return doc;
  }

  async bulkDelete(ids, userId) {
    if (!Array.isArray(ids) || ids.length === 0) {
      throw new ApiError(400, 'Please provide an array of ids');
    }
    
    // Check if model supports soft delete
    if (this.model.schema.paths.isDeleted) {
      return await this.model.updateMany(
        { _id: { $in: ids } },
        { 
          $set: { 
            isDeleted: true, 
            deletedAt: new Date(),
            updatedBy: userId 
          }
        }
      );
    }
    
    return await this.model.deleteMany({ _id: { $in: ids } });
  }

  async bulkUpdateStatus(ids, status, userId) {
    if (!Array.isArray(ids) || ids.length === 0) {
      throw new ApiError(400, 'Please provide an array of ids');
    }
    return await this.model.updateMany(
      { _id: { $in: ids } },
      { $set: { status, updatedBy: userId } }
    );
  }
}
