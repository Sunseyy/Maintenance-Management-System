// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './Operators/pages/Login';
import Dashboard from './Operators/pages/dashboard';
import ReportDefects from './Operators/pages/ReportDefects';
import { AuthProvider } from './Operators/pages/AuthContext'; // Make sure this is the correct import

const App = () => {
    return (
        <AuthProvider> {/* Use AuthProvider instead of AuthContext */}
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/user" element={<ReportDefects />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
