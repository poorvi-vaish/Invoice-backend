export interface ListFilters {
  pagination: { page: number; limit: number };
  sort: { field: string; order: 'ASC' | 'DESC' };
  filter: Record<string, string>;
}
