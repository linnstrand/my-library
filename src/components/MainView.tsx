import React, { useState } from "react";

type Book = {
  id: number;
  title: string;
  writer: string;
  year: number;
  serie?: string;
};

type MainViewProps = {
  books: Book[];
  view: "grid" | "list";
  onBookSelect: (book: Book) => void;
};

const MainView: React.FC<MainViewProps> = ({ books, view, onBookSelect }) => {
  return (
    <div
      className={view === "grid" ? "grid grid-cols-3 gap-4 p-4" : "list p-4"}
    >
      {books.map((book) => (
        <div
          key={book.id}
          className="p-4 border rounded cursor-pointer hover:shadow"
          onClick={() => onBookSelect(book)}
        >
          <h3 className="font-bold">{book.title}</h3>
          <p>Writer: {book.writer}</p>
          <p>Year: {book.year}</p>
          {book.serie && <p>Serie: {book.serie}</p>}
        </div>
      ))}
    </div>
  );
};

export default MainView;
