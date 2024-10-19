import React, { useState } from 'react';
import '../css/sidebar.css'; // Make sure to create this CSS file and copy your CSS styles here.

const Sidebar = () => {
    const [isActive, setIsActive] = useState(false);

    const toggleSidebar = () => {
        setIsActive(!isActive);
    };

    return (
        <div className={`navigation ${isActive ? 'active' : ''}`}>
            <ul>
                <li>
                    <a href="#">
                        <span className="title">Manager</span>
                    </a>
                </li>
                <li>
                    <a href="/dashboard"> {/* Updated link to /dashboard */}
                        <span className="icon"><ion-icon name="home-outline"></ion-icon></span>
                        <span className="title">Dashboard</span>
                    </a>
                </li>
                <li>
                    <a href="/admin/tasks"> {/* Updated link to /tasks */}
                        <span className="icon"><ion-icon name="person-outline"></ion-icon></span>
                        <span className="title">Tasks</span> {/* Fixed casing for "Tasks" */}
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span className="icon"><ion-icon name="help-outline"></ion-icon></span>
                        <span className="title">Help</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span className="icon"><ion-icon name="settings-outline"></ion-icon></span>
                        <span className="title">Setting</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span className="icon"><ion-icon name="lock-closed-outline"></ion-icon></span>
                        <span className="title">Password</span>
                    </a>
                </li>
                <li>
                    <a href="/"> {/* Updated link to / for Sign Out */}
                        <span className="icon"><ion-icon name="log-out-outline"></ion-icon></span>
                        <span className="title">Sign Out</span>
                    </a>
                </li>
            </ul>
            <div className="toggle" onClick={toggleSidebar}></div>
        </div>
    );
};

export default Sidebar;
