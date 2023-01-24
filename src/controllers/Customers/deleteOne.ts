import { Request } from 'express';
import { getRepository } from 'typeorm';
import { AppResponse } from '../../utils/responseFormats';
import { customers } from '../../entity/customers';
import { logError } from '../../utils/logError';

export default async (req: Request, res: AppResponse) => {
  const Items = getRepository(customers);

  const { id } = req.body;
  if (!id) return res.status(400).json({ error: true, message: 'ID not provided' });

  try {
    // Delete a user
    await Items.delete(id);
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    // Log everything else as 500
    logError(err, res);
  }
};
