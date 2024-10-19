// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './Operators/pages/Login';
import Dashboard from './Operators/pages/dashboard';
import ReportDefects from './Operators/pages/ReportDefects';
import { AuthProvider } from './Operators/pages/AuthContext';
import TasksPage from './Operators/pages/tasks';
import HeaderOperator from './Operators/pages/headerOperator';
import LeakTestMachine from './Operators/machines/leaktasteMachine';
import Sidebar from './Operators/pages/sidebar';
import PrivateRoute from './Operators/pages/privateRoute';
 // Import the PrivateRoute component

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/user" element={
                        <PrivateRoute>
                            <HeaderOperator />
                            <ReportDefects />
                        </PrivateRoute>
                    } />
                    <Route path="/tasks" element={
                        <PrivateRoute>
                            <HeaderOperator />
                            <TasksPage />
                        </PrivateRoute>
                    } /> {/* Route for Tasks */}
                    <Route path="/report-defects" element={
                        <PrivateRoute>
                            <HeaderOperator />
                            <ReportDefects />
                        </PrivateRoute>
                    } /> {/* Route for Report Defects */}
                    <Route path="/machines" element={
                        <PrivateRoute>
                            <Sidebar />
                            <LeakTestMachine />
                        </PrivateRoute>
                    } />
                    <Route path="/admin/tasks" element={
                        <>
                            <Sidebar />
                            <TasksPage />
                        </>
                    } />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
