import type { Author, BookAmazon } from '../types';

type MainViewProps = {
  books: Map<string, Author>;
  view: 'grid' | 'list';
  onBookSelect: (book: BookAmazon) => void;
};

export const MainView = ({ books, view, onBookSelect }: MainViewProps) => {
  return (
    <div
      className={view === 'grid' ? 'grid grid-cols-3 gap-4 p-4' : 'list p-4'}
    >
      {[...books.entries()].map(([name, author]) => (
        <div
          key={name}
          className="p-4 border rounded cursor-pointer hover:shadow"
        >
          <h3 className="font-bold">{name}</h3>
          books: {author.books.length}
          {author.books.map((book) => {
            const meta = book.seriesInfo ?? book.metadata;
            return meta ? (
              <div>
                <b>{book.title}</b>
                <span>
                  :{book.bookNumber} {meta}
                </span>
              </div>
            ) : (
              <div>
                <b>{book.title}</b>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
