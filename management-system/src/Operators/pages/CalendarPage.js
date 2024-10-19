import React, { useState, useEffect } from 'react';
import '../css/CalendarPage.css';
import { database } from '../../firebase/firebase';
import { ref, set, onValue } from "firebase/database";

const Calendar = () => {
  const [today, setToday] = useState(new Date());
  const [activeDay, setActiveDay] = useState(today.getDate());
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [eventsArr, setEventsArr] = useState([]);
  const [eventTitle, setEventTitle] = useState('');

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const initCalendar = () => {
    // Any additional calendar initialization logic can be added here
  };

  const gotoToday = () => {
    const currentDate = new Date();
    setToday(currentDate);
    setActiveDay(currentDate.getDate());
    setMonth(currentDate.getMonth());
    setYear(currentDate.getFullYear());
  };

  const goToMonthYear = (e) => {
    e.preventDefault();
    const input = e.target.elements.dateInput.value.split('/');
    if (input.length === 2) {
      const monthInput = parseInt(input[0]) - 1; // convert to zero-index
      const yearInput = parseInt(input[1]);
      if (monthInput >= 0 && monthInput <= 11 && yearInput > 0) {
        setMonth(monthInput);
        setYear(yearInput);
        setActiveDay(1); // Reset active day
      } else {
        alert("Invalid month/year format!");
      }
    }
  };

  const addEvent = () => {
    const newEvent = {
      title: eventTitle,
      day: activeDay,
      month: month + 1, // Firebase stores month as 1-12
      year: year,
      time: new Date().toLocaleTimeString(),
    };

    const eventRef = ref(database, 'events/' + Date.now()); // Unique ID for each event
    set(eventRef, newEvent).then(() => {
      setEventTitle(''); // Clear input after saving
    });
  };

  useEffect(() => {
    const eventsRef = ref(database, 'events/');
    onValue(eventsRef, (snapshot) => {
      const data = snapshot.val();
      const eventsList = [];
      for (let id in data) {
        eventsList.push(data[id]);
      }
      setEventsArr(eventsList);
    });
    initCalendar();
  }, [month, year, activeDay]);

  return (
    <div className='Calendar_full'>
    <div className="container">
      <div className="left">
        <div className="calendar">
          <div className="month">
            <i className="fas fa-angle-left prev" onClick={() => setMonth(month - 1 < 0 ? 11 : month - 1)}></i>
            <div className="date">{months[month]} {year}</div>
            <i className="fas fa-angle-right next" onClick={() => setMonth(month + 1 > 11 ? 0 : month + 1)}></i>
          </div>
          <div className="weekdays">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => <div key={day}>{day}</div>)}
          </div>
          <div className="days">
            {Array.from({ length: new Date(year, month + 1, 0).getDate() }, (_, i) => (
              <div 
                key={i + 1} 
                className={`day ${activeDay === i + 1 ? 'active' : ''}`} 
                onClick={() => setActiveDay(i + 1)}
              >
                {i + 1}
              </div>
            ))}
          </div>
          <div className="goto-today">
            <form onSubmit={goToMonthYear}>
              <div className="goto">
                <input type="text" name="dateInput" placeholder="mm/yyyy" className="date-input" />
                <button type="submit" className="goto-btn">Go</button>
              </div>
            </form>
            <button className="today-btn" onClick={gotoToday}>Today</button>
          </div>
        </div>
      </div>
      <div className="right">
        <div className="today-date">
          <div className="event-day">{new Date(year, month, activeDay).toLocaleString('en-US', { weekday: 'short' })}</div>
          <div className="event-date">{activeDay} {months[month]} {year}</div>
        </div>
        <div className="events">
          {eventsArr
            .filter(event => event.day === activeDay && event.month === month + 1 && event.year === year)
            .map((event, index) => (
              <div key={index}>
                <h4>Events:</h4>
                <div>
                  {event.title} - {event.time}
                </div>
              </div>
          ))}

          <div className="event-input-container">
            <input 
              type="text" 
              className="event-input" 
              placeholder="Schedule a fix here" 
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
            />
            <button className="add-event" onClick={addEvent}>
              <i className="fas fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Calendar;
