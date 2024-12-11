import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from '../src/components/Login/Login';
import SignUp from '../src/components/Login/signup';  // Note: Correct case for `signup`

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Redirect root route to "/login" */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Define routes for Login, SignUp, and Home */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />

          {/* Fallback for undefined routes */}
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
