'use client';

import { useState, useEffect } from 'react';
import { FormControl, ListGroup } from 'react-bootstrap';

export default function SeeLessonsPage() {
  const [users, setUsers] = useState([]);  
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [lessons, setLessons] = useState([]);

  // Fetch all users on page load
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        console.log('Fetched users:', data); // Debug
        setUsers(data.map(u => u.name));
      } catch (error) {
        console.error('Error fetching users:', error);
        setUsers([]);
      }
    }
    
    fetchUsers();
  }, []);  // Run once on mount

  // Handle input changes and filter suggestions
  const handleQueryChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    // Filter suggestions based on input
    if (value.trim() === '') {
      setSuggestions([]);
    } else {
      const filtered = users.filter(user => 
        user.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);  // Limit to 5 suggestions - .slice(0, 5)
    }
  };

  const handleSelect = async (name) => {
    setQuery(name);
    setSuggestions([]);  // Clear suggestions after selection
    console.log('Selected user:', name); // Debug
    try {
      let lessons = await fetch(`/api/lessons-by-user?user=${name}`);
      if (!lessons.ok) {
        throw new Error('Failed to fetch lessons');
      }
      lessons = await lessons.json();
      console.log('Fetched lessons:', lessons); // Debug
      setLessons(lessons);
    } catch (error) {
      console.error('Error fetching lessons:', error);
      setLessons([]);
    }
  };

  // Helper function to format date and time
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], {
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false // Use 24-hour format 
    });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Find Your Lessons</h2>
      <div className="mb-3">
        <FormControl
          placeholder="Start typing your name..."
          value={query}
          onChange={handleQueryChange}
          autoComplete="off"
        />
        {suggestions.length > 0 && (
          <ListGroup className="mt-1 position-relative shadow-sm">
            {suggestions.map(u => (
              <ListGroup.Item key={u} action onClick={() => handleSelect(u)}>
                {u}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </div>

      {query && lessons.length > 0 && (
        <>
          <h3 className="mt-4">Lessons for {query}</h3>
          <ListGroup>
            {lessons.map(les => (
              <ListGroup.Item key={les.id} >
              {new Date(les.startTime).toLocaleDateString()} {' | '}
              {formatTime(les.startTime)} - {formatTime(les.endTime)} | Room {les.room}
            </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      )}
      
      {query && lessons.length === 0 && (
        <p className="mt-4">No lessons found for {query}</p>
      )}
    </div>
  );
}
