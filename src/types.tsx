export interface Book {
  title: string;
  metadata: string[];
  seriesInfo: string[];
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
  books: Book[];
}
