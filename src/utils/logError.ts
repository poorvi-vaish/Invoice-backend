import { AppResponse } from './responseFormats';
import { ListFilters } from '../@types/request';
import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';
import { ValidationError } from 'class-validator';

export const logError = (err: any, res: AppResponse) => {
  console.log(err);
  const error = err as { code: string; detail: string };
  if (error.code) return res.status(400).json({ error: true, message: error.detail });
  res.status(500).json({ error: true, message: 'Internal Server Error', errorStack: err });
};

export const validationError = (err: ValidationError[], res: AppResponse) => {
  res.status(400).json({ error: true, message: 'Invalid Params', errorStack: err });
};

export const filterError = (filter: ListFilters, entityColumns: Array<ColumnMetadata>) => {
  if (!filter.pagination) return 'Pagination filter not provided.';
  if (!filter.pagination.page) return 'Page number not provided.';
  if (!filter.pagination.limit) return 'Limit of items not provided.';
  if (!filter.sort) return 'Sort filter not provided.';
  if (!filter.sort.field) return 'Sort field not provided.';
  if (!filter.sort.order) return 'Sort order not provided.';

  if (typeof filter.pagination.page !== typeof 1 || filter.pagination.page < 1)
    return 'Page should be an integer and greater than 0';

  if (typeof filter.pagination.limit !== typeof 1 || filter.pagination.page < 1)
    return 'Limit should be an integer and greater than 0';

  if (entityColumns.findIndex((x) => x.propertyName === filter.sort.field) < 0)
    return 'Sort field is invalid';

  if (!(filter.sort.order === 'ASC' || filter.sort.order === 'DESC'))
    return 'Sort order can only be ASC or DESC';

  return false;
};
