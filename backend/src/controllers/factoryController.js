import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';

export const createOne = (service, validationSchema) => [
  asyncHandler(async (req, res, next) => {
    if (validationSchema) {
      const { error } = validationSchema.validate(req.body, { abortEarly: false });
      if (error) {
        const errorMessages = error.details.map((detail) => detail.message);
        return res.status(400).json({ success: false, message: 'Validation Error', errors: errorMessages });
      }
    }
    next();
  }),
  asyncHandler(async (req, res) => {
    const doc = await service.create(req.body, req.user?.id);
    res.status(201).json(new ApiResponse(201, doc, 'Created successfully'));
  })
];

export const getAll = (service) => asyncHandler(async (req, res) => {
  const { docs, total } = await service.getAll(req.query);
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  
  res.status(200).json({
    success: true,
    message: 'Fetched successfully',
    total,
    page,
    pages: Math.ceil(total / limit),
    data: docs
  });
});

export const getOne = (service, populateOptions) => asyncHandler(async (req, res) => {
  const doc = await service.getOne(req.params.id, populateOptions);
  res.status(200).json(new ApiResponse(200, doc, 'Fetched successfully'));
});

export const updateOne = (service, validationSchema) => [
  asyncHandler(async (req, res, next) => {
    if (validationSchema) {
      const { error } = validationSchema.validate(req.body, { abortEarly: false, allowUnknown: true });
      if (error) {
        const errorMessages = error.details.map((detail) => detail.message);
        return res.status(400).json({ success: false, message: 'Validation Error', errors: errorMessages });
      }
    }
    next();
  }),
  asyncHandler(async (req, res) => {
    const doc = await service.update(req.params.id, req.body, req.user?.id);
    res.status(200).json(new ApiResponse(200, doc, 'Updated successfully'));
  })
];

export const deleteOne = (service) => asyncHandler(async (req, res) => {
  await service.delete(req.params.id, req.user?.id);
  res.status(200).json(new ApiResponse(200, null, 'Deleted successfully'));
});

export const bulkDelete = (service) => asyncHandler(async (req, res) => {
  const result = await service.bulkDelete(req.body.ids, req.user?.id);
  res.status(200).json(new ApiResponse(200, result, 'Bulk deletion successful'));
});

export const bulkUpdateStatus = (service) => asyncHandler(async (req, res) => {
  const result = await service.bulkUpdateStatus(req.body.ids, req.body.status, req.user?.id);
  res.status(200).json(new ApiResponse(200, result, 'Bulk status update successful'));
});
