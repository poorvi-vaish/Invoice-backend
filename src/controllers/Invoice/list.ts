import { Request } from 'express';
import { getRepository } from 'typeorm';
import { AppResponse } from '../../utils/responseFormats';
import { ListFilters } from '../../@types/request';
import { logError, filterError } from '../../utils/logError';
import { invoice } from '../../entity/invoice';

export default async (req: Request, res: AppResponse) => {
  const Invoice = getRepository(invoice);

  let filters = req.body.filters as ListFilters;

  // If no filters are provided, take default filters
  if (!filters)
    filters = {
      pagination: { page: 1, limit: 100000 },
      sort: { field: 'created_at', order: 'ASC' },
      filter: {},
    };
  else {
    // If filters are provided, validate filters
    const error = filterError(filters, Invoice.metadata.columns);
    // If error in filters, return
    if (error) return res.status(400).json({ error: true, message: error });
  }

  try {
    // extract filter values
    const {
      pagination: { page, limit },
      sort: { field, order }
    } = filters;

    const skip = (page - 1) * limit;
    const take = limit;

    // Get users along with their count
    const [invoices, count] = await Invoice.findAndCount({
      skip,
      take,
      order: { [field]: order },
    });

    // check if more users are present
    const hasMore = skip + invoices.length < count;

    // return data
    return res.status(200).json({ success: true, data: { hasMore, records: invoices, total: count } });
  } catch (err) {
    // Log everything else as 500
    logError(err, res);
  }
};
