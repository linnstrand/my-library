import React, { useState } from 'react';
import { Header } from './components/Header';
import { MainView } from './components/MainView';
import { Sidebar } from './components/Sidebar';
import books from './readbooks.json';
// import amazon from './amazon.json';
// import goodread from './goodread.json';
import type { Author, Book } from './types';

const readbooks = books as Book[];
// const amazonbooks = amazon as BookAmazon[];

// const getGoodreadBooks = (amazonbooks: BookAmazon[]): Book[] => {
//   const abooks = amazonbooks.reduce((acc, amazonbook) => {
//     const book = parseAmazonTitleString(amazonbook);

//     acc.set(book.title, book);

//     return acc;
//   }, new Map<string, Book>());

//   const goodreadsbooks = goodread as Goodreads[];

//   const readGoodreads = goodreadsbooks.filter((g) => g['Read Count'] === 0);

//   const books = readGoodreads.map((goodreadBook) => {
//     const titleData = parseGoodreadTitleString(goodreadBook.Title);
//     const amazonBook = abooks.get(titleData.title);
//     if (amazonBook) {
//       abooks.delete(amazonBook.title);
//     }

//     const aditionalAuthors = goodreadBook['Additional Authors']
//       .split(', ')
//       .filter((a) => !!a);

//     const book: Book = {
//       ...titleData,
//       authorLF: goodreadBook['Author l-f'],
//       author: goodreadBook.Author,
//       aditionalAuthors:
//         aditionalAuthors.length > 0 ? aditionalAuthors : undefined,
//       isbn: extractNumber(goodreadBook.ISBN),
//       rating: goodreadBook['Average Rating'],
//       publisher: goodreadBook.Publisher,
//       pageCount: goodreadBook['Number of Pages'],
//       published:
//         goodreadBook['Original Publication Year'] ??
//         goodreadBook['Year Published'],
//     };
//     return book;
//   });

//   return books;
// };

const App: React.FC = () => {
  const [view, setView] = useState<'grid' | 'list'>('list');
  const [sorting, setSorting] = useState<'nrBooksRead' | 'writer'>('writer');
  const [selectedBook, setSelectedBook] = useState<Author | null>(null);

  // const goodreadsbooks = useMemo(() => getGoodreadBooks(amazonbooks), []);

  return (
    <div className="h-screen overflow-hidden">
      <Header
        onViewChange={setView}
        view={view}
        sorting={sorting}
        onSortChange={setSorting}
      />
      <div className="flex h-[calc(100vh-4rem)]">
        <main className="flex-1 overflow-y-auto ">
          <MainView
            myBooks={readbooks}
            view={view}
            sorting={sorting}
            onBookSelect={(item) => setSelectedBook(item)}
          />
        </main>

        <aside className="w-sm border-l sticky top-16 h-[calc(100vh-4rem)]">
          <Sidebar selectedAuthor={selectedBook} key={selectedBook?.authorLF} />
        </aside>
      </div>
    </div>
  );
};

export default App;
