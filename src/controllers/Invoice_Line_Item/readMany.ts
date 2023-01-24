import { Request } from 'express';
import { getRepository, In } from 'typeorm';
import { AppResponse } from '../../utils/responseFormats';
import { invoice_line_item } from '../../entity/invoice_line_item';
import { logError } from '../../utils/logError';

export default async (req: Request, res: AppResponse) => {
  const Invoice_Line_Item = getRepository(invoice_line_item);

  const { ids } = req.body;
 
  if (!ids) return res.status(400).json({ error: true, message: 'Incomplete Params' });

  try {

    const invoice_line_items = await Invoice_Line_Item.find({
      where: { id: In(ids) }
    });
 
    return res.status(200).json({ success: true, data: invoice_line_items });
  } catch (err) {
    // log everything else as 500
    return logError(err, res);
  }
};
