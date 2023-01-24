import { Request } from 'express';
import { getRepository } from 'typeorm';
import { AppResponse } from '../../utils/responseFormats';
import { dues } from '../../entity/dues';
import { logError, validationError } from '../../utils/logError';
import { validate } from 'class-validator';

export default async (req: Request, res: AppResponse) => {
  const Dues = getRepository(dues);

  const { amount, date, customer_id, description, item_id } = req.body;

  try {
    const due = Dues.create({ amount, date, customer_id, description, item_id });

    // Check for validation errors
    const errors = await validate(due, { validationError: { target: false } });

    // Return errors if any
    if (errors.length) return validationError(errors, res);

    // Insert into database
    await Dues.insert(due);

    // return rest
    res.status(200).json({ success: true, data: due });
  } catch (err) {
    // Log everything else as 500
    logError(err, res);
  }
};
