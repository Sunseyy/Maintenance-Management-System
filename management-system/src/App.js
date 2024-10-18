import logo from './logo.svg';
import './App.css';
import ReportDefects from './Operators/pages/ReportDefects';
import TasksPage from './Operators/pages/tasks';
import CalendarPage from './Operators/pages/CalendarPage';

import Machines from './Operators/pages/Dashboard/machines';

import Calendar from './Operators/pages/CalendarPage';
import MeetingChart from './Operators/pages/Dashboard/meetingChart';
import LineChart from './Operators/pages/Dashboard/LineChart';






function App() {
  return (
    <div className="App">
    
    <div className='main-content'>
    <Machines/>
    <LineChart/>
    <Calendar/>
    <MeetingChart/>
    </div>

    </div>
  );
}

export default App;
