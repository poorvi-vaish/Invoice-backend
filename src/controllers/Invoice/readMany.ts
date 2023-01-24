import { Request } from 'express';
import { getRepository, In } from 'typeorm';
import { AppResponse } from '../../utils/responseFormats';
import { invoice } from '../../entity/invoice';
import { logError } from '../../utils/logError';

export default async (req: Request, res: AppResponse) => {
  const Invoice = getRepository(invoice);

  const { ids } = req.body;
 
  if (!ids) return res.status(400).json({ error: true, message: 'Incomplete Params' });

  try {

    const invoices = await Invoice.find({
      where: { id: In(ids) }
    });
 
    return res.status(200).json({ success: true, data: invoices });
  } catch (err) {
    // log everything else as 500
    return logError(err, res);
  }
};
