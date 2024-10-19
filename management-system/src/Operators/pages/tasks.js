import React, { useEffect, useState } from 'react';
import { database } from '../../firebase/firebase'; // Ensure this points to your Firebase setup
import { ref, get } from 'firebase/database';
import '../css/tasks.css'; // Import your CSS file for styling



const TaskCard = ({ task }) => {
  // Create an array of issues that are true
  const issues = [];
  if (task.issues.noise) issues.push('Noise');
  if (task.issues.notResponding) issues.push('Not Responding');
  if (task.issues.overheating) issues.push('Overheating');
  if (task.issues.stops) issues.push('Stops');
  if (task.issues.vibrating) issues.push('Vibrating');
  if (task.issues.other) issues.push(`Other: ${task.issues.other}`);

  const handleStart = () => {
    // Add your logic to handle starting the task
    alert(`Starting task for ${task.machineName}`); // Example alert for demonstration
    // You might want to update the task's status in your database here
  };

  return (
    <div className="task-card">
      <h3>Machine Name: {task.machineName}</h3>
      <p>Status: {task.highPriority ? 'High Priority' : 'Normal Priority'}</p>
      <p>Issues: {issues.length > 0 ? issues.join(', ') : 'No Issues'}</p>
      {task.media && <img src={task.media} alt={task.machineName} className='imagemachine' />}
      <button className='start-button' onClick={handleStart}>START</button> {/* Add START button */}
    </div>
  );
};


const TasksPage = () => {
  const [tasks, setTasks] = useState([]); // State to store fetched tasks
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksRef = ref(database, 'defects'); // Reference to the 'defects' node
        const snapshot = await get(tasksRef); // Get the data from the Realtime Database

        if (snapshot.exists()) {
          const tasksData = snapshot.val(); // Get the data in object form
          const tasksArray = Object.keys(tasksData).map(key => ({
            id: key, // Get the task ID
            ...tasksData[key], // Get the task data
          }));
          setTasks(tasksArray); // Update state with fetched tasks
        } else {
          console.log('No tasks found');
        }
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setError(err); // Set error state
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchTasks(); // Call the fetch function
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return <div>Loading tasks...</div>; // Loading state
  }

  if (error) {
    return <div>Error loading tasks: {error.message}</div>; // Error handling
  }

  return (
    <div className="tasks-page">
      <h2>Tasks</h2>
      <div className="tasks-list">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TasksPage;
