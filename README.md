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

Our team developed a smart analytics platform that enables the factory to monitor its machines effectively. Key machines—such as stamping presses, welding robots, and AGVs—can be tracked using critical data such as temperature, vibration, energy use, and tool wear. Early detection of potential problems can prevent downtime and costly repairs.

The platform provides:

- **Real-Time Production Tracking**: Monitor progress to ensure that production targets are met and identify bottlenecks promptly.
- **Defect Logging and Analysis**: Log and analyze defects to identify patterns and address recurring issues, ensuring high product quality.
- **Timely Alerts**: Receive notifications for critical machine conditions, allowing quick action to minimize disruptions.
- **Energy Consumption Monitoring**: Track energy usage across machines to identify opportunities for cost savings and sustainability improvements.
- **Maintenance Scheduling**: Automate maintenance tasks based on machine usage, ensuring timely upkeep to maintain equipment efficiency.

---

## **Our Solution**

Our solution is a platform designed for two user roles: Manager and Operator, each with distinct responsibilities to ensure smooth operation and communication:

### **Manager Role**

We created a dashboard where managers can monitor all machines in real-time. The dashboard displays key machine data and sends alerts when machines exceed performance thresholds. Managers can use this information to schedule maintenance and inspections, sending task notifications directly to operators to ensure that any issues are addressed promptly.

### **Operator Role**

Operators receive notifications about tasks, such as machine inspections or repairs, directly from the manager. If an operator detects an issue with a machine, they can report it back to the manager immediately. Once an assigned task is completed, operators can mark it as done, keeping everyone updated on the progress.

This solution enhances efficiency by keeping machine management centralized for managers, while operators are guided through their tasks, improving communication and minimizing downtime. Our team worked collaboratively to create a seamless process that allows for better decision-making and faster responses to potential machine issues.

### Features

- **Operator Functions**:
  - Request changes and report machine defects.
  - Check assigned tasks and start working on them.

- **Admin Dashboard**:
  - Monitor upcoming events and schedule machine repairs.
  - View tasks, users, and machine parameters (e.g., temperature, pressure) for the latest hours.
  - Predict potential machine problems using AI.

---

## Technologies Used

- **Frontend**: React
- **Backend**: Flask for backend and API handling
- **Database**: Firebase (for authentication, real-time database, and storage)
- **Additional Libraries**:
  - React Router for routing
  - Chart.js for data visualization

---

## Getting Started

To run this application, follow these steps:

### 1. Clone the repository:

```bash
git clone <repository-url>
cd <repository-folder>

### Install the dependencies:

npm install

### Start the development server:

npm start

Install additional packages (if needed):
npm install firebase
React Router
Chart.js (or any other dependencies mentioned)

### To see the admin data visualization part (we did not have time to link it)

# in a terminal:
 cd appp
ngrok http 5000
# take the url of free app proposed copy into the callback url in app.py
# in another terminal:

cd appp
python app.py

