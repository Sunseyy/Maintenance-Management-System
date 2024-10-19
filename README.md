# Smart Analytics Platform for Car Manufacturing Operations

## Introduction

Car manufacturing relies on a smooth, fast-paced process where machines and workers must work in perfect harmony. Every step—like stamping metal sheets into car doors or welding frames together—needs to be precise to meet the high demand for vehicles. To stay competitive, the factory must focus on efficiency and coordination.

## Context

Inside the factory, various machines collaborate to maintain production flow. Stamping presses shape metal sheets, CNC machines carve engine parts, painting robots coat car bodies, and Automated Guided Vehicles (AGVs) transport parts. However, continuous machine operation leads to several challenges:

- **Machine Wear**: Machines may wear out over time, leading to decreased performance.
- **Unexpected Delays**: Delays can occur, affecting the entire production line.
- **Increased Energy Use**: Rising energy consumption can inflate production costs.

These issues make it difficult to sustain smooth operations and high productivity. Managers need real-time monitoring tools to track machine performance, production output, product quality, and energy usage. Without these tools, minor issues can escalate into significant disruptions.

## Towards a Solution

Our solution is to develop a smart analytics platform that enables the factory to monitor its machines effectively. Key machines—such as stamping presses, welding robots, and AGVs—can be tracked using critical data such as temperature, vibration, energy use, and tool wear. Early detection of potential problems can prevent downtime and costly repairs.

The platform provides:

- **Real-Time Production Tracking**: Monitor progress to ensure that production targets are met and identify bottlenecks promptly.
- **Defect Logging and Analysis**: Log and analyze defects to identify patterns and address recurring issues, ensuring high product quality.
- **Timely Alerts**: Receive notifications for critical machine conditions, allowing quick action to minimize disruptions.
- **Energy Consumption Monitoring**: Track energy usage across machines to identify opportunities for cost savings and sustainability improvements.
- **Maintenance Scheduling**: Automate maintenance tasks based on machine usage, ensuring timely upkeep to maintain equipment efficiency.

### Features

- **Operator Functions**:
  - Request changes and report machine defects.
  - Check assigned tasks and start working on them.

- **Admin Dashboard**:
  - Monitor upcoming events and schedule machine repairs.
  - View tasks, users, and machine parameters (e.g., temperature, pressure) for the latest hours.
  - Predict potential machine problems using AI.

## Technologies Used

- **Frontend**: React
- **Backend**: Flask (for AI database handling)
- **Database**: Firebase (for authentication, real-time database, and storage)
- **Additional Libraries**: 
  - React Router for routing
  - Chart.js for data visualization

## Getting Started

To run this application, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
Install the dependencies:

bash
Copy code
npm install
Start the development server:

bash
Copy code
npm start
Install additional packages (if needed):

React Router
Chart.js (or any other dependencies mentioned)
Set up Firebase:

Configure your Firebase project and replace the Firebase configuration in your app accordingly.

