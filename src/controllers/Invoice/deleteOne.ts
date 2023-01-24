import { Request } from 'express';
import { getRepository } from 'typeorm';
import { AppResponse } from '../../utils/responseFormats';
import { invoice } from '../../entity/invoice';
import { logError } from '../../utils/logError';
import { invoice_line_item } from "../../entity/invoice_line_item";

export default async (req: Request, res: AppResponse) => {
  const Invoice = getRepository(invoice);
  const Invoice_Line_Item = getRepository(invoice_line_item);

  const { id } = req.body;
  if (!id) return res.status(400).json({ error: true, message: 'ID not provided' });

  try {
    // Delete a user
    await Invoice.delete(id);
    await Invoice_Line_Item.delete({ invoice_id: id });
    res.status(200).json({ success: true, message: 'Invoice deleted successfully' });
  } catch (err) {
    // Log everything else as 500
    logError(err, res);
  }
};
