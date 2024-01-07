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
      <div className="mx-auto mt-8 md:grid md:grid-cols-2">
        {books.map((book) => (
          <div className='flex my-4 mx-2 border-[1px] p-2 gap-6 rounded border-[#0088CC]'>
            <div className='w-[100px] flex justify-center items-center'>
              <img
                src={book.image}
                alt={book.title}
                style={{ width: '100px', objectFit: 'cover' }}
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="font-bold md:text-base" style={{ maxWidth: '200px', wordWrap: 'break-word', lineHeight: '1' }}>
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