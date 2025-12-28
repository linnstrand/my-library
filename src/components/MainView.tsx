import { useMemo } from 'react';
import type { Author, Book } from '../types';

type MainViewProps = {
  myBooks: Book[];
  view: 'grid' | 'list';
  sorting: 'nrBooksRead' | 'writer';

  onBookSelect: (book: Author) => void;
};

export const MainView = ({
  myBooks,
  view,
  sorting,
  onBookSelect,
}: MainViewProps) => {
  const authors = useMemo(() => {
    const authors = myBooks.reduce((acc, book) => {
      if (!acc.has(book.authorLF)) {
        const author = {
          books: [],
          authorLF: book.authorLF,
          author: book.author,
        } as Author;
        acc.set(book.authorLF, author);
      }
      acc.get(book.authorLF)!.books.push(book);

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

    return new Map(
      [...authors.entries()].sort((a, b) => {
        if (a[0] === 'Multiple') {
          return 1;
        }
        if (sorting === 'writer') {
          return a[0].localeCompare(b[0]);
        }
        return a[1].books.length < b[1].books.length ? 1 : -1;
      })
    );
  }, [sorting]);

  return view === 'list' ? (
    <div className={'grid grid-cols-3 gap-4 p-4'}>
      {[...authors.entries()].map(([name, author]) => (
        <button
          key={name}
          onClick={() => onBookSelect(author)}
          className="p-2 font-semibold bg-transparent border rounded text-l hover:text-blue-700"
        >
          <div className="flex justify-between w-full">
            <div>{author.author}</div>
            <div className="text-l">{author.books.length}</div>
          </div>
        </button>
      ))}
    </div>
  ) : (
    <div className={'grid grid-cols-3 gap-4 p-4'}>
      {[...authors.entries()].map(([name, author]) => (
        <div key={name} className="p-2 border rounded">
          <button
            onClick={() => onBookSelect(author)}
            className="m-0 text-xl font-semibold bg-transparent border border-transparent hover:text-blue-700 "
          >
            {author.author}
          </button>
          {author.series &&
            Object.entries(author.series).map(([name, serie]) => {
              return (
                <div>
                  <b>{name}</b>
                  <div>
                    {serie?.map((b) => (
                      <div
                        className={b.ownedOnAmazon ? 'text-amber-600' : ''}
                        key={b.title}
                      >
                        <span>{b.bookNumber}</span>
                        <span> {b.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      ))}
    </div>
  );
};
