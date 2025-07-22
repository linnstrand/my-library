import React from 'react';
import type { BookAmazon } from '../types';

type SidebarProps = {
  selectedBook: BookAmazon | null;
};

export const Sidebar: React.FC<SidebarProps> = ({ selectedBook }) => {
  if (!selectedBook) {
    return <div className="p-4">Select a book to see details</div>;
  }

  return (
    <div className="p-4 border-l">
      <h2 className="font-bold text-xl">{selectedBook.title}</h2>
      <p>Writer: {selectedBook.authors}</p>
      {selectedBook.serie && <p>Serie: {selectedBook.serie}</p>}
    </div>
  );
};
