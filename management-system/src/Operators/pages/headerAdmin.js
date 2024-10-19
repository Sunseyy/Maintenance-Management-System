import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/navbar.css'; // Assuming you have a CSS file for styling
import userIcon from '../assets/utilisateur.png';
import { auth } from '../../firebase/firebase';
import { signOut } from 'firebase/auth';

const HeaderAdmin = () => {
    const navigate = useNavigate();
    const [isLogoutVisible, setLogoutVisible] = useState(false);

    // Handler for button clicks
    const handleButtonClick = (route) => {
        navigate(route);
    };

    // Function to toggle the visibility of the logout options
    const toggleLogoutMenu = () => {
        setLogoutVisible((prev) => !prev);
    };

    // Function to handle logout
    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/'); // Redirect to the login page after logout
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    console.log('HeaderAdmin rendered');
    return (
        <header className="header-operator">
            <nav className="navbar">
                <div className="logo"></div>
                <div className="nav-buttons">
                    <button className="operator-btn" onClick={toggleLogoutMenu}>
                        <img src={userIcon} alt="Operator Icon" className="operator-icon" /> Admin
                    </button>
                    {/* Render logout options if visible */}
                    {isLogoutVisible && (
                        <div className="logout-menu">
                            <button className="logout-btn" onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                    {/* Dashboard button */}
                    <button className="dashboard-btn" onClick={() => handleButtonClick('/dashboard')}>
                        Dashboard
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default HeaderAdmin;
