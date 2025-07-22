import React, { useState } from 'react';
import { Header } from './components/Header';
import { MainView } from './components/MainView';
import { Sidebar } from './components/Sidebar';
import amazon from './amazon.json';
import type { BookAmazon, Author } from './types';
import { parseBookString } from './utils';

const amazonbooks = amazon as BookAmazon[];

const App: React.FC = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [selectedBook, setSelectedBook] = useState<BookAmazon | null>(null);

  const groupBooksBy = () => {
    const authors = amazonbooks.reduce((acc, amazonbook) => {
      amazonbook.authors.forEach((a) => {
        const authors = a.split(':').filter((s) => s.length > 1);
        const isAnthology = authors.length > 3;
        const book = parseBookString(amazonbook.title, isAnthology);
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

    //     authors.forEach((a) => {
    //   const groups = a.books.reduce((acc, obj) => {
    //     const key = obj.seriesInfo;
    //     if (!key) return acc;
    //     const curGroup = acc[key] ?? [];
    //     return { ...acc, [key]: [...curGroup, obj] };
    //   }, {});

    //   a.series = groups;
    // });

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
      <div className="w-1/4">
        <Sidebar selectedBook={selectedBook} />
      </div>
    </div>
  );
};

export default App;
