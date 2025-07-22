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
        if (isAnthology && authors.length < 4) {
          console.log(authors, amazonbook);
        }
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

    const sortedMap = new Map(
      [...authors.entries()].sort((a, b) => {
        if (a[0] === 'Collections') {
          return 1;
        }
        return a[0].localeCompare(b[0]);
      })
    );

    return sortedMap;
  };

  return (
    <div className="flex">
      <div className="flex-1">
        <Header onViewChange={setView} />
        <MainView
          books={groupBooksBy()}
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
