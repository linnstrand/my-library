export interface TitleData {
  title: string;
  seriesInfo?: string;
  bookNumber: number | null;
}

export interface Book extends TitleData {
  authorLF: string;
  author: string;
  aditionalAuthors?: string[];
  isbn?: number;
  rating?: number;
  publisher?: string;
  pageCount?: number;
  published?: number;
  readDate?: string;
  ownedOnAmazon?: boolean;
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
  authorLF: string;
  author: string;
}

export interface Goodreads {
  'Book Id': number;
  Title: string;
  Author: string;
  'Author l-f': string;
  'Additional Authors': string;
  ISBN: string;
  ISBN13: string;
  'My Rating': number;
  'Average Rating': number;
  Publisher: string;
  Binding: string;
  'Number of Pages': number;
  'Year Published': number;
  'Original Publication Year': number;
  'Date Read': string;
  'Date Added': string;
  Bookshelves: string;
  'Bookshelves with positions': string;
  'Exclusive Shelf': string;
  'My Review': string;
  Spoiler: string;
  'Private Notes': string;
  'Read Count': number;
  'Owned Copies': number;
}
