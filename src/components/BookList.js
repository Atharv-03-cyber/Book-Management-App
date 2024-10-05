import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookList.css';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const [formValues, setFormValues] = useState({ title: '', price: '' });

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

  const editBook = (book) => {
    setIsEditing(true);
    setCurrentBook(book);
    setFormValues({ title: book.title, price: book.price });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedBooks = books.map((book) =>
      book.id === currentBook.id
        ? { ...book, title: formValues.title, price: parseFloat(formValues.price) }
        : book
    );
    setBooks(updatedBooks);
    setIsEditing(false);
    setCurrentBook(null);
    setFormValues({ title: '', price: '' });
  };

  return (
    <div className='container'>
      <h1 className='heading'>Books Management Tool</h1>
      {isEditing && (
        <form onSubmit={handleSubmit} className='edit-form'>
          <h2>Edit Book</h2>
          <label>
            Title:
            <input type='text' name='title' value={formValues.title} onChange={handleInputChange} required maxLength={100} minLength={1}/>
          </label>
          <label>
            Price:
            <input type='number' name='price' value={formValues.price} onChange={handleInputChange} required min={1} />
          </label>
          <button type='submit'>Update</button>
          <button type='button' onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      )}
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
                    <button onClick={(e) => { e.stopPropagation(); editBook(book); }} className='edit-button'>Edit</button>
                  </td>
                </tr>
              ))
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
