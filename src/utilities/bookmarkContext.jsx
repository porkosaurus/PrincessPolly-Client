import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the BookmarkContext
const BookmarkContext = createContext();

// Create a BookmarkProvider component to wrap your entire application
export function BookmarkProvider({ children }) {
  const [bookmarkCount, setBookmarkCount] = useState(0);

  // Fetch bookmark data from the backend and set the initial bookmarkCount
  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) { // Check if username is not null
      fetch(`https://protected-dusk-79821-d54a1f8d392c.herokuapp.com/api/getbookmarklength/${username}`)
        .then((response) => response.json())
        .then((data) => {
          console.log('Bookmark Length:', data);
          setBookmarkCount(data);
        })
        .catch((err) => console.error(err));
    }
  }, []);
  

  // Function to increment bookmarkCount
  const incrementBookmarkCount = () => {
    setBookmarkCount((prevCount) => prevCount + 1);
  };

  return (
    <BookmarkContext.Provider value={{ bookmarkCount, incrementBookmarkCount }}>
      {children}
    </BookmarkContext.Provider>
  );
}

// Create a custom hook to use the BookmarkContext
export function useBookmark() {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmark must be used within a BookmarkProvider');
  }
  return context;
}

