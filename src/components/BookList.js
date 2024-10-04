import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookList.css';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('/books.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchBooks();
  }, []);

  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/books/${id}`);
  };

  const deactivateBook = (id) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id ? { ...book, isActive: false } : book
      )
    );
  };
  
  return (
    <div className='container'>
      <h1 className='heading'>Books Management Tool</h1>
      <table className='table'>
        <thead className='table-top'>
          <tr>
            <th className='table-rows'>Book Cover</th>
            <th className='table-rows'>Book Title</th>
            <th className='table-rows'>Book Author</th>
            <th className='table-rows'>Book Genre</th>
            <th className='table-rows'>Book Publication</th>
            <th className='table-rows'>Book Pages</th>
            <th className='table-rows'>Book Price</th>
            <th className='table-rows'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books
              .filter(book => book.isActive)
              .map((book) => (
                <tr key={book.id} className='content' onClick={() => handleRowClick(book.id)} style={{ cursor: 'pointer' }}>
                  <td>
                    <img src={book.cover} alt={book.title} style={{ width: '80px', marginTop: "10px" }} className='img' />
                  </td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                  <td>{book.publication}</td>
                  <td>{book.pages}</td>
                  <td>${book.price.toFixed(2)}</td>
                  <td>
                    <button onClick={(e) => { e.stopPropagation(); deactivateBook(book.id); }} className='deactivate-button'>Deactivate</button>
                  </td>
                </tr>
              ))// **//
          ) : (
            <tr>
              <td colSpan="8">No books available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
