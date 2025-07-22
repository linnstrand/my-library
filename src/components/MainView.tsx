import type { Author, BookAmazon } from '../types';

type MainViewProps = {
  authors: Map<string, Author>;
  view: 'grid' | 'list';
  onBookSelect: (book: BookAmazon) => void;
};

export const MainView = ({ authors, view, onBookSelect }: MainViewProps) => {
  return (
    <div
      className={view === 'grid' ? 'grid grid-cols-3 gap-4 p-4' : 'list p-4'}
    >
      {[...authors.entries()].map(([name, author]) => (
        <div key={name} className="p-4 border rounded">
          <h3 className="font-bold"> {name.split(', ').reverse().join(' ')}</h3>
          books: {author.books.length}
          {/* {author.books.map((book) => {
            const meta = book.seriesInfo ?? book.metadata;
            return meta ? (
              <div>
                <b>{book.title}</b>
                <span>{book.seriesInfo}</span>
              </div>
            ) : (
              <div>
                <b>{book.title}</b>
              </div>
            );
          })} */}
          {author.series &&
            Object.entries(author.series).map(([name, books]) => {
              if (name === 'Standalone') {
                return (
                  <div>
                    {books?.map((book) => (
                      <div>
                        <b>{book.title}</b>
                        <span>{book.seriesInfo ?? book.metadata}</span>
                      </div>
                    ))}
                  </div>
                );
              }
              return (
                <div>
                  <b>{name}</b>
                  <div>
                    {books?.map((b) => (
                      <div>
                        {b.bookNumber} {b.title}
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
