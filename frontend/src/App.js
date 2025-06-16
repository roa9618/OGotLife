import React from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Routine from './pages/Routine';
import Todo from './pages/Todo';
import Record from './pages/Record';
import Calendar from './pages/Calendar';
import FocusMode from './pages/FocusMode';
import Community from './pages/Community';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard"/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/routine" element={<Routine/>}/>
        <Route path="/todo" element={<Todo/>}/>
        <Route path="/record" element={<Record/>}/>
        <Route path="/calendar" element={<Calendar/>}/>
        <Route path="/focus" element={<FocusMode/>}/>
        <Route path="/community" element={<Community/>}/>
      </Routes>
    </Router>
  );
}

export default App;