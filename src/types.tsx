export interface Book {
  title: string;
  rawtitle: string;
  metadata?: string;
  seriesInfo?: string;
  bookNumber: number | null;
  isAnthology: boolean;
}

export interface BookAmazon {
  title: string;
  asin: string;
  productUrl: string;
  percentageRead?: number;
  authors: string[];
}

export interface Author {
  series?: Partial<Record<string, Book[]>>;
  books: Book[];
}
