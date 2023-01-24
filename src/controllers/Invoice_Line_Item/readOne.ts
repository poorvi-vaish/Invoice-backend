import { Request } from 'express';
import { getRepository, In } from 'typeorm';
import { AppResponse } from '../../utils/responseFormats';
import { invoice_line_item } from '../../entity/invoice_line_item';
import { logError } from '../../utils/logError';

export default async (req: Request, res: AppResponse) => {
  const Invoice_Line_Item = getRepository(invoice_line_item);

  const { id } = req.body;
 
  if (!id) return res.status(400).json({ error: true, message: 'Incomplete Params' });

  try {
    const invoice_line_item = await Invoice_Line_Item.findOne(id);

    if (!invoice_line_item)
      return res.status(404).json({ error: true, message: "Entity not found" });
  } catch (err) {
    // log everything else as 500
    return logError(err, res);
  }
};
