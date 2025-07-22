import React from "react";

type Book = {
  id: number;
  title: string;
  writer: string;
  year: number;
  serie?: string;
};

type SidebarProps = {
  selectedBook: Book | null;
};

const Sidebar: React.FC<SidebarProps> = ({ selectedBook }) => {
  if (!selectedBook) {
    return <div className="p-4">Select a book to see details</div>;
  }

  return (
    <div className="p-4 border-l">
      <h2 className="font-bold text-xl">{selectedBook.title}</h2>
      <p>Writer: {selectedBook.writer}</p>
      <p>Year: {selectedBook.year}</p>
      {selectedBook.serie && <p>Serie: {selectedBook.serie}</p>}
    </div>
  );
};

export default Sidebar;
