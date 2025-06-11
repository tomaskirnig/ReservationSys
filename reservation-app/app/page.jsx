'use client';

import { useState, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import csLocale from '@fullcalendar/core/locales/cs';
import Flatpickr from 'react-flatpickr';
import { Button } from 'react-bootstrap';
import 'flatpickr/dist/flatpickr.min.css';
import styles from './page.module.css'; 
import LessonModal from './components/LessonModal';
import { Czech } from 'flatpickr/dist/l10n/cs.js';

export default function HomePage() {
  const calendarRef = useRef(null);
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [room, setRoom] = useState('Hlavni');
  const [showModal, setShowModal] = useState(false);

  const fetchEvents = async () => {
    const ymd = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

    const selectedRoom = room || 'Hlavni';
    
    try {
      const response = await fetch(`/api/lessons?day=${ymd}&room=${selectedRoom}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', response.status, errorData);
        throw new Error(errorData.error || 'Failed to fetch events');
      }
      
      const data = await response.json();
      console.log(`Fetched ${data.length} events for ${selectedRoom} on ${ymd}`);
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
      alert(`Failed to fetch events: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [date, room]);

  return (
    <>
      <div className={styles.calendarPageWrapper}>
        <div className={styles.calendarControls}>
          <Button 
            variant="primary" 
            className="w-100"
            onClick={() => setShowModal(true)}
            >
            Add Lesson
          </Button>

          <div className="d-flex justify-content-between align-items-center mb-2 mt-2">
            <Flatpickr
              className='form-control text-center mr-2'
              value={date}
              onChange={([d]) => setDate(d)}
              options={{ 
                dateFormat: 'd.m.Y',
                locale: Czech,
                allowInput: true, 
                disableMobile: false,
                time_24hr: true
              }}
            />
            
            <select 
              className='form-select text-center ml-2'
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              >
              <option value="Hlavni">Hlavní sál</option>
              <option value="Tiberius">Tiberius</option>
              <option value="Benedikt">Benedikt</option>
            </select>
          </div>
        </div>

        <div className={styles.calendarContainer}>
          <FullCalendar
            plugins={[timeGridPlugin]}
            initialView="timeGridDay"
            allDaySlot={false}
            headerToolbar={false}
            events={events}
            ref={calendarRef}
            locale={csLocale}
            height="100%"
            expandRows={true}
            handleWindowResize={true}
            initialDate={date} // Add this line to sync with Flatpickr
            key={date.toISOString()} // Force re-render when date changes
          />
        </div>
      </div>

      {/* Lesson Modal */}
      <LessonModal 
        show={showModal}
        date={date}
        passedRoom={room}
        handleClose={() => setShowModal(false)}
        onLessonAdded={fetchEvents}
      />
    </>
  );
}
