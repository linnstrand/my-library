import type { Author, BookAmazon } from '../types';

type MainViewProps = {
  books: Map<string, Author>;
  view: 'grid' | 'list';
  onBookSelect: (book: BookAmazon) => void;
};

export const MainView = ({ books, view, onBookSelect }: MainViewProps) => {
  console.log(books);
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
          {author.books.map((book) => (
            <div>
              {book.title} {book.metadata} {book.seriesInfo}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
