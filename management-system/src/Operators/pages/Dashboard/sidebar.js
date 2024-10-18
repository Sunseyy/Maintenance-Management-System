import React from 'react';
import './sidebar.css';
const Sidebar = () => {
    return (
        <div className="sidebar">
            <ul>
                <li><a href="#machines">Machines</a></li>
                <li><a href="#future-prediction">Future Prediction</a></li>
                <li><a href="#calendar">Calendar</a></li>
                <li><a href="#meeting-chart">Meeting Levels</a></li>
                <li><a href="#info">Info</a></li>
                <li><a href="#schedule-calendar">Schedule Calendar</a></li>
                <li><a href="#tasks">See Tasks</a></li>
                <li><a href="#logout">Log Out</a></li>
            </ul>
        </div>
    );
};

export default Sidebar;
