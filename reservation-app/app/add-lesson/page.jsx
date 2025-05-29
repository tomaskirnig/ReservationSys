'use client';
import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export default function AddLessonPage() {
  const [show, setShow] = useState(true);
  const [name, setName] = useState('');
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const room = 'RoomA'; // or derive via query param

  const handleSave = async () => {
    await fetch('/api/lessons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, start, end, room })
    });
    setShow(false);
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton><Modal.Title>Add Lesson</Modal.Title></Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Name</Form.Label>
            <Form.Control value={name} onChange={e => setName(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Start</Form.Label>
            <Flatpickr
              value={start}
              onChange={([d]) => setStart(d)}
              options={{ enableTime: true, dateFormat: 'Y-m-d H:i' }}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>End</Form.Label>
            <Flatpickr
              value={end}
              onChange={([d]) => setEnd(d)}
              options={{ enableTime: true, dateFormat: 'Y-m-d H:i' }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
        <Button variant="primary" onClick={handleSave}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}
