import mongoose from 'mongoose';

export const basePlugin = (schema) => {
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
  schema.pre(/^find/, function () {
    if (this.getQuery().isDeleted === undefined) {
      this.find({ isDeleted: { $ne: true } });
    }
  });

  // Query Helpers
  schema.query.active = function () {
    return this.where({ isDeleted: false });
  };
};
