import { Request } from 'express';
import { getRepository } from 'typeorm';
import { AppResponse } from '../../utils/responseFormats';
import { items } from '../../entity/items';
import { logError, validationError } from '../../utils/logError';
import { validate } from 'class-validator';

export default async (req: Request, res: AppResponse) => {
  const Items = getRepository(items);

  const { name, quantity, weight, type } = req.body;

  try {
    const item = Items.create({ name, quantity: quantity || 0, weight: weight  || 0, type });

    // Check for validation errors
    const errors = await validate(item, { validationError: { target: false } });

    // Return errors if any
    if (errors.length) return validationError(errors, res);

    // Insert into database
    await Items.insert(item);

    // return rest
    res.status(200).json({ success: true, data: item });
  } catch (err) {
    // Log everything else as 500
    logError(err, res);
  }
};
