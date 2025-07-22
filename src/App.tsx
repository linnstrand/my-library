import React, { useState } from "react";
import Header from "./components/Header";
import MainView from "./components/MainView";
import Sidebar from "./components/Sidebar";

interface Book {
  id: number;
  title: string;
  writer: string;
  year: number;
  serie?: string;
}

const App: React.FC = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [groupBy, setGroupBy] = useState<"serie" | "writer">("serie");
  const [sortBy, setSortBy] = useState<"title" | "writer" | "year">("title");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const books: Book[] = [
    {
      id: 1,
      title: "Book One",
      writer: "Author A",
      year: 2020,
      serie: "Series X",
    },
    { id: 2, title: "Book Two", writer: "Author B", year: 2018 },
    {
      id: 3,
      title: "Book Three",
      writer: "Author A",
      year: 2021,
      serie: "Series X",
    },
  ];

  const groupedBooks =
    groupBy === "serie"
      ? books.reduce((acc, book) => {
          const key = book.serie || "No Serie";
          acc[key] = acc[key] || [];
          acc[key].push(book);
          return acc;
        }, {} as Record<string, Book[]>)
      : books.reduce((acc, book) => {
          const key = book.writer;
          acc[key] = acc[key] || [];
          acc[key].push(book);
          return acc;
        }, {} as Record<string, Book[]>);

  const sortedBooks = Object.values(groupedBooks).flatMap((group) =>
    group.sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "writer") return a.writer.localeCompare(b.writer);
      return a.year - b.year;
    })
  );

  return (
    <div className="flex">
      <div className="flex-1">
        <Header
          onViewChange={setView}
          onGroupByChange={setGroupBy}
          onSortChange={setSortBy}
        />
        <MainView
          books={sortedBooks}
          view={view}
          onBookSelect={setSelectedBook}
        />
      </div>
      <div className="w-1/4">
        <Sidebar selectedBook={selectedBook} />
      </div>
    </div>
  );
};

export default App;
