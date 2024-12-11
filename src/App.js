import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import SignUp from './components/Login/signup';  // Note: Correct case for `signup`
import { getCookie } from './components/Utils';

function App() {
  const token = getCookie('token'); // Fetch token from cookies

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Home route, if token exists, render Home else redirect to /login */}
          <Route path="/" element={token == null ? <Navigate to="/login" /> : <Navigate to="/home" />} />

          {/* Login and SignUp routes */}
          <Route path="/login" element={token != null ? <Navigate to="/home" /> : <Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={token == null ? <Navigate to="/login" /> : <Home />} />

          {/* 404 Page */}
          <Route
            path="*"
            element={
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <h2>404 - Page Not Found</h2>
                <p>The page you are looking for does not exist.</p>
                <a href="/login" style={{ textDecoration: 'none', color: 'blue' }}>Go to Login</a>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
