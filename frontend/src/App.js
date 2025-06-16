import React, { useState } from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Routine from './pages/Routine';
import Todo from './pages/Todo';
import Record from './pages/Record';
import Calendar from './pages/Calendar';
import FocusMode from './pages/FocusMode';
import Community from './pages/Community';
import Login from './pages/Login';
import Signup from './pages/Signup';
import FindAccount from './pages/FindAccount';
import CommunityWrite from "./pages/CommunityWrite";
import CommunityPostView from "./pages/CommunityPostView";
import MyComments from "./pages/MyComments";
import MyPosts from "./pages/MyPosts";
import MyScraps from "./pages/MyScraps";

function BlurOverlay({ onLoginClick }) {
  return (
    <div className="blur-overlay">
      <div className="blur-message">
        <div className="blur-title">로그인이 필요한 서비스입니다.</div>
        <button className="blur-login-btn" onClick={onLoginClick}>로그인</button>
      </div>
    </div>
  );
}

function AppRoutes({ isLoggedIn, setIsLoggedIn }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthPage =
    location.pathname === '/login' ||
    location.pathname === '/signup' ||
    location.pathname === '/find-account';

  return (
    <div className={(!isLoggedIn && !isAuthPage) ? 'blurred-root' : ''}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard"/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/routine" element={<Routine/>}/>
        <Route path="/todo" element={<Todo/>}/>
        <Route path="/record" element={<Record/>}/>
        <Route path="/calendar" element={<Calendar/>}/>
        <Route path="/focus" element={<FocusMode/>}/>
        <Route path="/community" element={<Community/>}/>
        <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)}/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/find-account" element={<FindAccount/>}/>
        <Route path="/community/write" element={<CommunityWrite/>}/>
        <Route path="/community/post/:postId" element={<CommunityPostView/>}/>
        <Route path="/mycomments" element={<MyComments/>}/>
        <Route path="/myposts" element={<MyPosts/>}/>
        <Route path="/myscraps" element={<MyScraps/>}/>
      </Routes>
      {(!isLoggedIn && !isAuthPage) && (
        <BlurOverlay onLoginClick={() => navigate('/login')}/>
      )}
    </div>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <Router>
      <AppRoutes isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </Router>
  );
}

export default App;