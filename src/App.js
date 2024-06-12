import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Landing from './Landing page/Dashboard';
import ADashboard from './Admin page/ADashboard';
import TDashboard from './Teacher page/TDashboard';
import SDashboard from './Student page/SDashboard';
import CustomAppBar from './component/CustomAppBar';
import ScrollToTopOnNavigate from './component/ScrolltoNavigate';
import { UserProvider } from './UserContext';
import { SwitchProvider } from './switchStatesContext';
import UserProfile from './Users/UserProfile';
import CircularProgress from '@mui/material/CircularProgress';

function App() {
  
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const startTime = Date.now();
    const storedUser = sessionStorage.getItem('loggedInUser');
    if (storedUser) {
      console.log('User loaded from session storage:', JSON.parse(storedUser));
      setLoggedInUser(JSON.parse(storedUser));
    } else {
      console.log('No user found in session storage.');
    }
    const endTime = Date.now();
    const duration = endTime - startTime;
    setTimeout(() => {
      setLoading(false);
    }, Math.max(1000 - duration, 0));
  }, []);

  useEffect(() => {
    if (loggedInUser) {
      sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    } else {
      sessionStorage.removeItem('loggedInUser');
    }
  }, [loggedInUser]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', backgroundColor: 'transparent' }}>
        <CircularProgress size={100} style={{ color: '#F2B569' }} disableShrink />
      </div>
    );
  }

  return (
    <UserProvider>
      <SwitchProvider> 
      <Router>
        <ScrollToTopOnNavigate />
        <Routes>
          <Route path='/' element={<Landing setLoggedInUser={setLoggedInUser} />} />
          <Route path='/ADashboard/*' element={<ProtectedRoute role="admin" component={<ADashboard />} loggedInUser={loggedInUser} />} />
          <Route path='/TDashboard/*' element={<ProtectedRoute role="teacher" component={<TDashboard />} loggedInUser={loggedInUser} />} />
          <Route path='/SDashboard/*' element={<ProtectedRoute role="student" component={<SDashboard />} loggedInUser={loggedInUser} />} />
          <Route path='/:currentPath/Profile' element={<ProtectedRoute component={<UserProfile />} loggedInUser={loggedInUser} />} />
          <Route path='*' element={<Navigate to="/" />} />
        </Routes>
      </Router>
      </SwitchProvider>
    </UserProvider>
  );
}

function ProtectedRoute({ role, component, loggedInUser }) {
  const location = useLocation();

  useEffect(() => {
    sessionStorage.setItem('lastVisitedPage', location.pathname);
  }, [location.pathname]);

  if (loggedInUser === null) {
    // Refresh the page when loggedInUser is null
    window.location.reload();
    return null; // Return null to avoid rendering anything until the page reloads
  }

  if (!loggedInUser) {
    return <Navigate to='/' />;
  }

  if (role && loggedInUser.role !== role) {
    switch (loggedInUser.role) {
      case 'admin':
        return <Navigate to='/ADashboard' />;
      case 'teacher':
        return <Navigate to='/TDashboard' />;
      case 'student':
        return <Navigate to='/SDashboard' />;
      default:
        return <Navigate to='/' />;
    }
  }

  return (
    <>
      <CustomAppBar loggedInUser={loggedInUser} role={role} />
      {component}
    </>
  );
}

export default App;
