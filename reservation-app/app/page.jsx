'use client';

import { useState, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export default function HomePage() {
  const calendarRef = useRef(null);
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  // useEffect(() => {
  //   const ymd = date.toISOString().slice(0,10);
  //   fetch(`/api/lessons?day=${ymd}`)
  //     .then(r => r.json())
  //     .then(setEvents);
  // }, [date]);

  return (
    <>
      <div className="mb-3">
        <Flatpickr
          className='form-control'
          value={date}
          onChange={([d]) => setDate(d)}
          options={{ dateFormat: 'd-m-Y' }}
        />
      </div>
      <FullCalendar
        plugins={[timeGridPlugin]}
        initialView="timeGridDay"
        headerToolbar={true}
        events={events}
        ref={calendarRef}
      />
    </>
  );
}
