import React, { useState } from 'react';
import { Header } from './components/Header';
import { MainView } from './components/MainView';
import { Sidebar } from './components/Sidebar';
import amazon from './amazon.json';
import goodread from './goodread.json';
import type { BookAmazon, Author, Goodreads } from './types';
import { parseAmazonTitleString, parseGoodreadTitleString } from './utils';

const amazonbooks = amazon as BookAmazon[];

const getGoodreadBooks = (goodreadsbooks: Goodreads[]) => {
  const authors = goodreadsbooks.reduce((acc, goodreadBook) => {
    const additionalAuthors = goodreadBook['Additional Authors']
      .replace(/\s\s+/g, ' ')
      .split(',')
      .filter((s) => s.length > 1);

    const isAnthology = additionalAuthors.length > 2;
    const titleData = parseGoodreadTitleString(goodreadBook.Title, isAnthology);
    const book = {
      ...titleData,
      additionalAuthors: goodreadBook['Additional Authors'].split(', '),
      isbn: goodreadBook.ISBN,
      rating: goodreadBook['Average Rating'],
      publisher: goodreadBook.Publisher,
      pageCount: goodreadBook['Number of Pages'],
      published:
        goodreadBook['Original Publication Year'] ??
        goodreadBook['Year Published'],
      readDate: goodreadBook['Date Read'],
    };

    const key = goodreadBook['Author l-f'];

    if (!acc.has(key)) {
      const author = { books: [] };
      acc.set(key, author);
    }
    acc.get(key)!.books.push(book);

    return acc;
  }, new Map<string, Author>());

  authors.forEach((a) => {
    a.books.sort((a, b) => {
      if (a.bookNumber && b.bookNumber) {
        return a.bookNumber > b.bookNumber ? 1 : -1;
      }

      return a.title.localeCompare(b.title);
    });
    const result = Object.groupBy(
      a.books,
      ({ seriesInfo }) => seriesInfo ?? 'Standalone'
    );
    a.series = result;
  });

  const sortedMap = new Map(
    [...authors.entries()].sort((a, b) => {
      if (a[0] === 'Collections') {
        return 1;
      }
      return a[0].localeCompare(b[0]);
      // return a[1].books.length < b[1].books.length ? 1 : -1;
    })
  );

  return sortedMap;
};

const getAmazonBooks = () => {
  const authors = amazonbooks.reduce((acc, amazonbook) => {
    amazonbook.authors.forEach((a) => {
      const authors = a.split(':').filter((s) => s.length > 1);
      const isAnthology = authors.length > 3;
      const book = parseAmazonTitleString(amazonbook.title, isAnthology);
      book.ownedOnAmazon = true;
      const keys = isAnthology ? ['Collections'] : authors;
      keys.forEach((key) => {
        if (!acc.has(key)) {
          const author = { books: [] };
          acc.set(key, author);
        }
        acc.get(key)!.books.push(book);
      });
    });
    return acc;
  }, new Map<string, Author>());

  authors.forEach((a) => {
    a.books.sort((a, b) => {
      if (a.bookNumber && b.bookNumber) {
        return a.bookNumber > b.bookNumber ? 1 : -1;
      }

      return a.title.localeCompare(b.title);
    });
    const result = Object.groupBy(
      a.books,
      ({ seriesInfo }) => seriesInfo ?? 'Standalone'
    );
    a.series = result;
  });

  const sortedMap = new Map(
    [...authors.entries()].sort((a, b) => {
      if (a[0] === 'Collections') {
        return 1;
      }
      // return a[0].localeCompare(b[0]);
      return a[1].books.length < b[1].books.length ? 1 : -1;
    })
  );

  return sortedMap;
};

const App: React.FC = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [selectedBook, setSelectedBook] = useState<BookAmazon | null>(null);

  const groupBooksBy = () => {
    const goodreadsbooks = goodread as Goodreads[];
    const readGoodreads = goodreadsbooks.filter((g) => g['Read Count'] > 0);
    const books = getGoodreadBooks(readGoodreads);
    const merged = [...books].map((a) => {
      const author = a[0];
    });
    const abooks = getAmazonBooks();
    return abooks;
  };

  return (
    <div className="flex">
      <div className="flex-1">
        <Header onViewChange={setView} />
        <MainView
          authors={groupBooksBy()}
          view={view}
          onBookSelect={setSelectedBook}
        />
      </div>
      {/* <div className="w-1/4">
        <Sidebar selectedBook={selectedBook} />
      </div> */}
    </div>
  );
};

export default App;
