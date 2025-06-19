import React, { useState } from 'react';
import styles from './BooksList.module.css';

interface Book {
  title: string;
  author: string;
  image: string;
}

interface BooksListProps {
  books: Book[];
}

export default function BooksList({ books }: BooksListProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.terminal}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="> Search by title or author..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {filteredBooks.length > 0 ? (
        <ul className={styles.bookList}>
          {filteredBooks.map((book) => (
            <li className={styles.bookItem} key={book.title}>
              <div
                onClick={() => openModal(book.image)}
                onKeyDown={(e) => e.key === 'Enter' && openModal(book.image)}
                role="button"
                tabIndex={0}
              >
                <img
                  src={book.image}
                  alt={`${book.title} cover`}
                  className={styles.bookThumbnail}
                />
              </div>
              <div className={styles.bookInfo}>
                <span className={styles.bookTitle}>{book.title}</span>
                <span className={styles.bookAuthor}>by {book.author}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.noResults}>
          <p>&gt; No results found for "{searchTerm}"</p>
        </div>
      )}
      {selectedImage && (
        <div 
            className={styles.modalBackdrop} 
            onClick={closeModal}
            onKeyDown={(e) => e.key === 'Escape' && closeModal()}
            role="button"
            tabIndex={0}
        >
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <button type="button" className={styles.closeButton} onClick={closeModal}>X</button>
            <img src={selectedImage} alt="Enlarged book cover" className={styles.modalImage} />
          </div>
        </div>
      )}
    </div>
  );
}