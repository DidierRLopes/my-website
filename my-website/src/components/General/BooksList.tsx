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
  const booksShuffled = books
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  return (
    <div>
      <div className="mx-auto mt-8 md:grid md:grid-cols-2">
        {booksShuffled.map((book) => (
          <div className='flex my-4 mx-2 border-[1px] p-2 rounded border-[#2e8555]'>
            <div className='w-[100px] flex justify-center items-center'>
              <img
                src={book.image}
                alt={book.title}
                style={{ width: '100px', objectFit: 'cover' }}
              />
            </div>
            <div className="ml-4 flex flex-col justify-center">
              <div className="font-bold md:text-lg" style={{ maxWidth: '200px', wordWrap: 'break-word', lineHeight: '1' }}>
                {book.title}
              </div>
              <div className="text-xs mt-2">
                {book.author}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};