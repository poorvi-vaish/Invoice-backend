import { Request } from 'express';
import { getRepository } from 'typeorm';
import { AppResponse } from '../../utils/responseFormats';
import { invoice } from '../../entity/invoice';
import { logError } from '../../utils/logError';
import { dues } from '../../entity/dues';

export default async (req: Request, res: AppResponse) => {
  const Invoice = getRepository(invoice);

  const { id } = req.body;
  if (!id) return res.status(400).json({ error: true, message: 'Incomplete Params' });

  try {
    const invoice = await Invoice.findOne(id);

    if (!invoice) return res.status(404).json({ error: true, message: 'Entity not found' });
  } catch (err) {
    // log everything else as 500
    return logError(err, res);
  }
};
