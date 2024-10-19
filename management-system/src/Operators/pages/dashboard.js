import React from 'react';
import Sidebar from './sidebar';
import '../css/dashboard.css';
import Calendar from './CalDash'; // Assuming this is your Calendar component
const Dashboard = () => {
    return (
        <div className='dashboard'>
            <Sidebar className='sidebar' />
            <div className='information_dashboard'>
                <div className='interface'>
                    <div className='Add_event'> Add event </div> 
                    {/* Add your Calendar component here */}
                    <div className='Check tasks'> Check tasks </div>
                    <div className='Check users'> Check users </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
