export type ListOrder = 'asc' | 'desc';

export type Page = 'first' | 'last' | 'next' | 'prev';

export interface IdName {
  id: string;
  name: string;
};

export type Set<T> = React.Dispatch<React.SetStateAction<T>>;