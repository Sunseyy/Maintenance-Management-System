import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Sidebar from './sidebar';
import '../css/dashboard.css';
import Calendar from './CalDash'; // Assuming this is your Calendar component
import MyChart from './chart';

const Dashboard = () => {
    return (
        <div className='dashboard'>
            <Sidebar className='sidebar' />
            <div className='information_dashboard'>
                <div className='interface'>
                    <Link to="/calendar" className='Add_event'> Add event </Link> {/* Change to Link for navigation */}
                    {/* Add your Calendar component here */}
                    
                    <Link to="/admin/tasks" className='Check tasks'> Check tasks </Link>
                    <div className='Check users'> Check users </div>
                    <Link to="/machines" className='Check another'> Machines</Link> {/* Change to Link for navigation */}
                    <div className='chart-wrapper'>
                        <MyChart /> {/* Add the chart here */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
