import { Request } from 'express';
import { getRepository } from 'typeorm';
import { AppResponse } from '../../utils/responseFormats';
import { dues } from '../../entity/dues';
import { logError } from '../../utils/logError';

export default async (req: Request, res: AppResponse) => {
  const Dues= getRepository(dues);

  const { id } = req.body;
  if (!id) return res.status(400).json({ error: true, message: 'Incomplete Params' });

  try {
    const due = await Dues.findOne(id);
    // If no user found, return 404
    if (!due) return res.status(404).json({ error: true, message: 'Entity not found' });
    return res.status(200).json({ success: true, data: due });
  } catch (err) {
    // log everything else as 500
    return logError(err, res);
  }
};
