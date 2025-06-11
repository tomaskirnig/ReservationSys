'use client';

import { useState, useEffect } from 'react';
import { FormControl, ListGroup } from 'react-bootstrap';

export default function SeeLessonsPage() {
  const [user, setUser] = useState('');
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        console.log('Fetched users:', data);
        setUser(data.map(u => u.name));
      } catch (error) {
        console.error('Error fetching users:', error);
        setUser([]);
      }
    }
    
    fetchUsers();
  },[]);

  const handleSelect = (name) => {
    setQuery(name);
    setSuggestions([]);
    fetch(`/api/lessons_by_user?user=${encodeURIComponent(name)}`)
      .then(r => r.json())
      .then(setLessons);
  };

  return (
    <div>
      <FormControl
        placeholder="Your name"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <ListGroup className="mt-1">
        {suggestions.map(u => (
          <ListGroup.Item key={u} action onClick={() => handleSelect(u)}>
            {u}
          </ListGroup.Item>
        ))}
      </ListGroup>

      <h3 className="mt-4">Lessons for {query}</h3>
      <ListGroup>
        {lessons.map(les => (
          <ListGroup.Item key={les.id}>
            {new Date(les.start).toLocaleTimeString()} - {new Date(les.end).toLocaleTimeString()} | Room {les.room}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
    );
}
