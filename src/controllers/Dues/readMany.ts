import { Request } from 'express';
import { getRepository, In } from 'typeorm';
import { AppResponse } from '../../utils/responseFormats';
import { dues } from '../../entity/dues';
import { logError } from '../../utils/logError';

export default async (req: Request, res: AppResponse) => {
  const Dues = getRepository(dues);

  const { ids } = req.body;
  // If email is not provided, return 400
  if (!ids) return res.status(400).json({ error: true, message: 'Incomplete Params' });

  try {
    // Get user with email
    const due = await Dues.find({
      where: { id: In(ids) }
    });
    // delete user's password and send userdata
    return res.status(200).json({ success: true, data: due });
  } catch (err) {
    // log everything else as 500
    return logError(err, res);
  }
};
