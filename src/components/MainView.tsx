import type { Author, BookAmazon } from '../types';

type MainViewProps = {
  authors: Map<string, Author>;
  view: 'grid' | 'list';
  onBookSelect: (book: BookAmazon) => void;
};

export const MainView = ({ authors, view }: MainViewProps) => {
  return view === 'list' ? (
    <div className={'grid grid-cols-3 gap-4 p-4'}>
      {[...authors.entries()].map(([name, author]) => (
        <div key={name} className="p-2 border rounded">
          <div className="flex justify-between">
            <h3 className="m-0 text-l">
              {name.split(', ').reverse().join(' ')}
            </h3>
            <div className="text-g">{author.books.length}</div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className={'grid grid-cols-3 gap-4 p-4'}>
      {[...authors.entries()].map(([name, author]) => (
        <div key={name} className="p-2 border rounded">
          <h3 className="m-0 text-xl">
            {name.split(', ').reverse().join(' ')}
          </h3>
          {author.series &&
            Object.entries(author.series).map(([name, serie]) => {
              if (name === 'Standalone' || serie?.length === 1) {
                return (
                  <ol className="mx-1">
                    {serie?.map((book) => (
                      <li>
                        <span>{book.title}</span>
                        <span className="text-xs overflow-ellipsis">
                          {book.readDate} {book.metadata}
                        </span>
                      </li>
                    ))}
                  </ol>
                );
              }
              return (
                <div>
                  <b>{name}</b>
                  <div>
                    {serie?.map((b) => (
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
