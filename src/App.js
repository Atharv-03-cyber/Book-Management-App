import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  const [books, setBooks] = useState([]); // Add state to hold books

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

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

  // Fetch books only if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchBooks();
    }
  }, [isAuthenticated]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/books"
          element={isAuthenticated ? (
            <div>
              <BookList books={books} />
              <button onClick={handleLogout} className="button">Logout</button>
            </div>
          ) : (
            <Navigate to="/login" />
          )}
        />
        <Route 
          path="/books/:id" 
          element={<BookDetails books={books} />} 
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
