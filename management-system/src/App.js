// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './Operators/pages/Login';
import Dashboard from './Operators/pages/dashboard';
import ReportDefects from './Operators/pages/ReportDefects';
import { AuthProvider } from './Operators/pages/AuthContext';
import TasksPage from './Operators/pages/tasks';
import HeaderOperator from './Operators/pages/headerOperator';

import Sidebar from './Operators/pages/sidebar';
import PrivateRoute from './Operators/pages/privateRoute';
import LeakTestMachine from './Operators/machines/leaktasteMachine';
import Calendar from './Operators/pages/CalendarPage'; // Import the CalendarPage component
import HeaderAdmin from './Operators/pages/headerAdmin';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/dashboard" element={
                        <>
                        <HeaderAdmin/>
                      <Dashboard />  </>} />
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
                    } />
                    <Route path="/report-defects" element={
                        <PrivateRoute>
                            <HeaderOperator />
                            <ReportDefects />
                        </PrivateRoute>
                    } />
                    <Route path="/machines" element={
                        <PrivateRoute>
                            <div>
                                <HeaderAdmin/>
                                <Sidebar />
                                <LeakTestMachine />
                            </div>
                        </PrivateRoute>
                    } />
                    <Route path="/admin/tasks" element={
                        <div>
                            <HeaderAdmin/>
                            <Sidebar />
                            <TasksPage />
                        </div>
                    } />
                    <Route path="/calendar" element={
                        <>
                        <HeaderAdmin></HeaderAdmin>
                        <Calendar /></>} /> {/* Fixed this line */}
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
