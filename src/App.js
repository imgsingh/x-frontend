import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from '../src/components/Login/Login';
import SignUp from '../src/components/Login/signup';  // Note: Correct case for `signup`
import { getCookie } from './components/Utils';

function App() {
  const token = getCookie('token');

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
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
