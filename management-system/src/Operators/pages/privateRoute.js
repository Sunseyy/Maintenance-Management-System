// src/components/PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const PrivateRoute = ({ children }) => {
    const { currentUser } = useContext(AuthContext);

    // Check if user is authenticated
    if (!currentUser) {
        // If not authenticated, redirect to login page
        return <Navigate to="/" />;
    }

    // If authenticated, render the children components
    return children;
};

export default PrivateRoute;
