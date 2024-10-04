import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BookDetails.css';

const BookDetails = ({ books }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = books.find((b) => b.id === parseInt(id));

  if (!book) {
    return <div>Book not found</div>;
  }
  
  return (
    <>
    <div className='container'>
    <div className="book-details">
      <h1>{book.title}</h1>
      <img src={book.cover} alt={book.title}style={{ width: '200px', marginTop: "10px", border:"solid black", boxShadow:"1px 1px 15px white"}} />
      <p><strong>Description:</strong> {book.description}</p>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Publication:</strong> {book.publication}</p>
      <p><strong>Pages:</strong> {book.pages}</p>
      <p><strong>Price:</strong> ${book.price.toFixed(2)}</p>
      <button className="back-button" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
    </div>
    </>
  );
};

export default BookDetails;
