import React, { useState } from 'react';
import type { Author, Book } from '../types';

type SidebarProps = {
  selectedAuthor: Author | null;
};

export const Sidebar: React.FC<SidebarProps> = ({ selectedAuthor }) => {
  const [selectedBook, setSelectedBook] = useState<Book | undefined>(undefined);
  if (!selectedAuthor) {
    return <div className="p-4">Select a book to see details</div>;
  }
  return (
    <>
      <div className="p-2">
        <h2 className="text-xl font-bold">{selectedAuthor.author}</h2>
        {selectedAuthor.series &&
          Object.entries(selectedAuthor.series).map(([name, serie]) => {
            return (
              <div key={selectedAuthor.author}>
                <span className="mt-1 font-bold text-l">{name}</span>
                <div>
                  {serie?.map((b) => (
                    <button
                      onClick={() => setSelectedBook(b)}
                      className={`w-full text-left
                    ${
                      selectedBook?.title === b.title
                        ? 'bg-slate-200 font-medium'
                        : 'hover:bg-slate-100'
                    }`}
                      key={b.title}
                    >
                      <div
                        className={`grid grid-cols-[1em_1fr_auto_auto] gap-1 ${b.ownedOnAmazon ? ' text-amber-600' : ''}`}
                      >
                        <div>{b.bookNumber}</div>
                        <div>{b.title}</div>
                        <div>{b.published}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
      </div>

      {selectedBook && (
        <div className="p-2 mt-6 space-y-2 border-t">
          <h3 className="font-semibold">{selectedBook.title}</h3>
          <div className="space-y-1">
            <Detail label="Author" value={selectedBook.author} />
            {selectedBook.aditionalAuthors && (
              <Detail
                label="Additional Authors"
                value={selectedBook.aditionalAuthors.join(', ')}
              />
            )}
            {selectedBook.seriesInfo && (
              <Detail
                label="Series"
                value={`${selectedBook.seriesInfo}${
                  selectedBook.bookNumber != null
                    ? ` #${selectedBook.bookNumber}`
                    : ''
                }`}
              />
            )}
            {selectedBook.publisher && (
              <Detail label="Publisher" value={selectedBook.publisher} />
            )}

            {selectedBook.published && (
              <Detail label="Published" value={selectedBook.published} />
            )}
            {selectedBook.pageCount && (
              <Detail label="Pages" value={selectedBook.pageCount} />
            )}
            {selectedBook.isbn && (
              <Detail label="ISBN" value={selectedBook.isbn} />
            )}
            {selectedBook.rating !== undefined && (
              <Detail
                label="Goodread Rating"
                value={`${selectedBook.rating} / 5`}
              />
            )}
            {selectedBook.readDate && (
              <Detail label="Read" value={selectedBook.readDate} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

type DetailProps = {
  label: string;
  value: string | number;
};

function Detail({ label, value }: DetailProps) {
  return (
    <div className="flex gap-1.5">
      <span className="text-slate-500">{label}:</span>
      <span className="">{value}</span>
    </div>
  );
}
