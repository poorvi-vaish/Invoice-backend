import { getRepository } from 'typeorm';
import { invoice } from '../../entity/invoice';
import { Request, Response } from 'express';

const getInvoiceCount = async (req: Request, res: Response) => {
  try {
    const Invoice = getRepository(invoice);
    const count = await Invoice.count();
    console.log('count', count);
    return res.status(200).json({
      data: count,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export default getInvoiceCount;
