// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './Operators/pages/Login';
import Dashboard from './Operators/pages/dashboard';
import ReportDefects from './Operators/pages/ReportDefects'; // Ensure this is correct
import { AuthProvider } from './Operators/pages/AuthContext';
import TasksPage from './Operators/pages/tasks';
import HeaderOperator from './Operators/pages/headerOperator';
import LeakTestMachine from './Operators/machines/leaktasteMachine';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/user" element={
                        <>
                        
                            <HeaderOperator />
                            <ReportDefects />
                        </>
                    } />
                    <Route path="/tasks" element={
                        <>
                            <HeaderOperator />
                            <TasksPage />
                        </>
                    } /> {/* Route for Tasks */}
                    <Route path="/report-defects" element={
                        <>
                            <HeaderOperator />
                            <ReportDefects />
                        </>
                    } /> {/* Route for Report Defects */}
                    <Route path="/machines" element={<LeakTestMachine />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
