import { Request } from 'express';
import { getRepository } from 'typeorm';
import { AppResponse } from '../../utils/responseFormats';
import { dues } from '../../entity/dues';
import { logError } from '../../utils/logError';

export default async (req: Request, res: AppResponse) => {
  const Dues = getRepository(dues);

  const { id } = req.body;
  if (!id) return res.status(400).json({ error: true, message: 'ID not provided' });

  try {
    // Delete a user
    await Dues.delete(id);
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    // Log everything else as 500
    logError(err, res);
  }
};
