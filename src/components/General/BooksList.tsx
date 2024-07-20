import React from 'react';

interface Book {
  title: string;
  author: string;
  image: string;
}

interface BooksListProps {
  books: Book[];
}

export default function BooksList({ books }: BooksListProps) {
  return (
    <div>
      <div className="book-wrapper">
        {books.map((book) => (
          <div className="book-items" key={book.title}>
            <div className="main-book-wrap">
              <div className="book-cover">
                <div className="book-inside"></div>
                <div className="book-image">
                  <img src={book.image} alt={`${book.title} from ${book.author}`} />
                  <div className="effect"></div>
                  <div className="light"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}