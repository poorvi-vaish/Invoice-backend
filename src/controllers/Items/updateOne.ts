import { Request } from 'express';
import { getRepository } from 'typeorm';
import { AppResponse } from '../../utils/responseFormats';
import { items } from '../../entity/items';
import { validate } from 'class-validator';
import { validationError, logError } from '../../utils/logError';

export default async (req: Request, res: AppResponse) => {
  const Items = getRepository(items);

  const { field, new_value, id, data } = req.body;
  // Check params
  if ((!field || !new_value || !id) && (!id || !data))
    return res.status(400).json({ error: true, message: 'Incomplete Params' });

  try {
    // Find User in Database
    const item = await Items.findOne(id);
    // If no user is present, return 404
    if (!item) return res.status(404).json({ error: true, message: 'User not found' });
    if (id && data) {
      const { name, quantity, weight } = data as items;
      item.name = name;
      item.quantity = quantity;
      item.weight = weight;
    } else {
      // If provided field is not present, return 404
      if (!item[field]) return res.status(404).json({ error: true, message: 'Invalid Field' });
      // Set user's new value
      item[field] = new_value;
    }
    // validate new user
    const errors = await validate(item, { validationError: { target: false } });
    // Return 400 if validation error
    if (errors.length) return validationError(errors, res);
    // Save new user
    await Items.save(item);
    return res.status(200).json({ success: true, data: item });
  } catch (err) {
    // log everything else as 500
    logError(err, res);
  }
};
