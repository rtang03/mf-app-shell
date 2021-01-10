export type Paginated<TItem = any> = {
  total: number;
  items: TItem[];
  hasMore: boolean;
  cursor: number;
};
