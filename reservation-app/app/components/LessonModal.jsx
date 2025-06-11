'use client';
import { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export default function LessonModal({ show, date, passedRoom, handleClose, onLessonAdded }) {
  const [name, setName] = useState('');
  const [nameProam, setNameProam] = useState('');
  const [start, setStart] = useState(new Date(date));
  const [end, setEnd] = useState(new Date(date));
  const [room, setRoom] = useState(passedRoom);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setName('');
    setNameProam('');
    setStart(new Date());
    setEnd(new Date());
    setRoom('Hlavni');
  };

  useEffect(() => {
    if (date) {
      const startDate = new Date(date);
      startDate.setHours(9, 0, 0, 0);
      setStart(startDate);
      
      // Set end time to start time + 45 miunutes
      const endDate = new Date(startDate.getTime());
      endDate.setMinutes(endDate.getMinutes() + 45);

      setEnd(endDate);
    }
    
    // Update room when prop changes
    if (room) {
      setRoom(room);
    }
  }, [date, room]);

  const handleSave = async () => {
    try {
      setIsSubmitting(true);
      const response = await fetch('/api/lessons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, nameProam, start, end, room })
      });
      
      if (!response.ok) {
        throw new Error('Failed to save lesson');
      }
      
      // Reset form and close modal
      resetForm();
      handleClose();
      
      // Refresh the calendar
      if (onLessonAdded) onLessonAdded();
    } catch (error) {
      console.error('Error saving lesson:', error);
      alert('Failed to save lesson: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Lesson</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Name</Form.Label>
            <Form.Control 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Name proam</Form.Label>
            <Form.Control 
              value={nameProam} 
              onChange={e => setNameProam(e.target.value)} 
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Room</Form.Label>
            <Form.Select 
              value={room} 
              onChange={e => setRoom(e.target.value)}
            >
              <option value="Hlavni">Hlavní sál</option>
              <option value="Tiberius">Tiberius</option>
              <option value="Benedikt">Benedikt</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Start</Form.Label>
            <Flatpickr
              className="form-control"
              value={start}
              onChange={([d]) => setStart(d)}
              options={{ enableTime: true, dateFormat: 'Y-m-d H:i' }}
            />
          </Form.Group>
          
          <Form.Group className="mb-2">
            <Form.Label>End</Form.Label>
            <Flatpickr
              className="form-control"
              value={end}
              onChange={([d]) => setEnd(d)}
              options={{ enableTime: true, dateFormat: 'Y-m-d H:i' }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button 
          variant="primary" 
          onClick={handleSave} 
          disabled={isSubmitting || !name}
        >
          {isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}