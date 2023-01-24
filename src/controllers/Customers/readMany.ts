import { Request } from 'express';
import { getRepository, In } from 'typeorm';
import { AppResponse } from '../../utils/responseFormats';
import { customers } from '../../entity/customers';
import { logError } from '../../utils/logError';

export default async (req: Request, res: AppResponse) => {
  const Items = getRepository(customers);

  const { ids } = req.body;
  // If email is not provided, return 400
  if (!ids) return res.status(400).json({ error: true, message: 'Incomplete Params' });

  try {
    // Get user with email
    const users = await Items.find({
      where: { id: In(ids) }
    });
    // delete user's password and send userdata
    return res.status(200).json({ success: true, data: users });
  } catch (err) {
    // log everything else as 500
    return logError(err, res);
  }
};
