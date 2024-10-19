import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../css/navbar.css'; // Assuming you have a CSS file for styling
import userIcon from '../assets/utilisateur.png';
import { auth } from '../../firebase/firebase'; // Import your firebase config
import { signOut } from 'firebase/auth'; // Import signOut from firebase/auth

const HeaderOperator = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [isLogoutVisible, setLogoutVisible] = useState(false); // State to manage logout visibility

    // Handler for button clicks
    const handleButtonClick = (route) => {
        navigate(route); // Navigate to the specified route
    };

    // Function to toggle the visibility of the logout options
    const toggleLogoutMenu = () => {
        setLogoutVisible((prev) => !prev); // Toggle the logout menu
    };

    // Function to handle logout
    const handleLogout = async () => {
        try {
            await signOut(auth); // Log the user out
            navigate('/'); // Redirect to the login page after logout
        } catch (error) {
            console.error('Logout error:', error); // Handle any errors during logout
        }
    };

    console.log('HeaderOperator rendered'); // Debugging line
    return (
        <header className="header-operator">
            <nav className="navbar">
                <div className="logo">AppName</div>
                <div className="nav-buttons">
                    <button className="nav-btn" onClick={() => handleButtonClick('/tasks')}>Tasks</button>
                    <button className="nav-btn" onClick={() => handleButtonClick('/report-defects')}>Send Request</button>
                    <button className="operator-btn" onClick={toggleLogoutMenu}>
                        <img src={userIcon} alt="Operator Icon" className="operator-icon" /> Operator
                    </button>
                    {/* Render logout options if visible */}
                    {isLogoutVisible && (
                        <div className="logout-menu">
                            <button className="logout-btn" onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default HeaderOperator; // Ensure you export the component here
