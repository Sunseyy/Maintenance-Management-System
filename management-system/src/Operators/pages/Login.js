import React, { useState } from 'react';
import '../css/login.css'; // Import your CSS file
import userIcon from '../assets/utilisateur.png'; // Adjust the path according to your project structure
import lockIcon from '../assets/bloquer.png'; // Adjust the path according to your project structure
import { auth } from '../../firebase/firebase'; // Import your firebase config
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (username === '' || password === '') {
            alert('Please fill in both fields.');
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, username, password);
            const user = userCredential.user;

            // Check if the user is an admin
            if (user.email === 'admin@gmail.com') { // Use the actual admin email
                alert('Welcome Admin!');
                navigate('/dashboard'); // Redirect to the dashboard
            } else {
                alert('Welcome User!');
                navigate('/user'); // Redirect to the user page (defect page)
            }
        } catch (error) {
            alert(error.message); // Handle error
        }

        // Reset form fields
        setUsername('');
        setPassword('');
    };

    return (
        <div className="login-page"> {/* Added wrapper class here */}
            <div className="login-container">
                <h1 style={{ marginBottom: '20px' }}>Login</h1>
                <form id="loginForm" onSubmit={handleSubmit}>
                    <div className="input-container">
                        <img src={userIcon} alt="User Icon" className="icon" />
                        <input
                            className='Input-login'
                            type="email" // Change input type to email for better user experience
                            placeholder="Email" // Change placeholder to Email
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="input-container">
                        <img src={lockIcon} alt="Lock Icon" className="icon" />
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className='submitbutt' type="submit">Login</button>
                    <a href="#" className="forgot-password">Forgot Password?</a>
                </form>
            </div>
        </div>
    );
};

export default Login;
