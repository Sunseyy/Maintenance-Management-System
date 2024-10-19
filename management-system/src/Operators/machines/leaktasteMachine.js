import React from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js'; // Import Chart and registerables
import './machines.css';

// Register all necessary components
Chart.register(...registerables);

const LeakTestMachine = () => {
    // Sample data for Test Pressure
    const pressureData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'], // X-axis labels
        datasets: [
            {
                label: 'Test Pressure (bar)',
                data: [5, 10, 8, 15, 12], // Y-axis data (pressure levels)
                fill: false,
                borderColor: '#e74c3c', // Line color
                tension: 0.1, // Smoothness of the line
            },
        ],
    };

    const pressureOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Test Pressure Overview',
            },
        },
    };

    // Sample data for Pressure Drop
    const dropData = {
        labels: ['Test 1', 'Test 2', 'Test 3', 'Test 4', 'Test 5'], // X-axis labels
        datasets: [
            {
                label: 'Pressure Drop (bar)',
                data: [1, 2, 1.5, 3, 2.5], // Y-axis data (pressure drop values)
                backgroundColor: '#2ecc71', // Bar color
            },
        ],
    };

    const dropOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Pressure Drop Overview',
            },
        },
    };

    // Sample data for Leak Rate
    const leakRateData = {
        labels: ['No Leak', 'Minor Leak', 'Moderate Leak', 'Severe Leak'], // Categories for pie chart
        datasets: [
            {
                label: 'Leak Rate (ml/min)',
                data: [50, 30, 10, 10], // Data representing the proportion of each category
                backgroundColor: ['#3498db', '#e67e22', '#e74c3c', '#9b59b6'], // Colors for each slice
            },
        ],
    };

    const leakRateOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Leak Rate Overview',
            },
        },
    };

    // Sample data for Test Duration
    const durationData = {
        labels: ['0-30 seconds', '30-60 seconds', '1-2 minutes', '2-5 minutes'], // Categories for pie chart
        datasets: [
            {
                label: 'Test Duration (seconds)',
                data: [40, 30, 20, 10], // Data representing the proportion of each category
                backgroundColor: ['#f1c40f', '#e67e22', '#3498db', '#2ecc71'], // Colors for each slice
            },
        ],
    };

    const durationOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Test Duration Overview',
            },
        },
    };

    return (
        <div className="charts-flex">
            <div className="chart-container">
                <Line data={pressureData} options={pressureOptions} />
            </div>
            <div className="chart-container">
                <Bar data={dropData} options={dropOptions} />
            </div>
            <div className="chart-container">
                <Pie data={leakRateData} options={leakRateOptions} width={  150} height={150} />
            </div>
            <div className="chart-container">
                <Pie data={durationData} options={durationOptions} width={150} height={150} />
            </div>
        </div>
    );
};

export default LeakTestMachine;
