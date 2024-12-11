import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Container, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../../components/Login/logo.png'; // Adjust path
import { getCookie } from '../Utils';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookie('token');

    if (token) {
      navigate('/home');
    }
  }, [navigate]);

  function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
  }

 
  const handleLogin = async (event) => {
    event.preventDefault();
    if (validateEmail(username) && password !== '') {
      try {
        const response = await fetch("http://twitter-team-turning-testers-19648cf420b7.herokuapp.com/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            "email": username,
            "password": password,
          })
        });
  
        const data = await response.json();
  
        const expirationDate = new Date();
        expirationDate.setFullYear(expirationDate.getFullYear() + 20);
  
        // Set token in cookies
        document.cookie = `token=${data.token}; expires=${expirationDate.toUTCString()}; path=/`;
  
        // Optionally save user details in localStorage
        localStorage.setItem("userDetails", JSON.stringify({
          userId: data.userId,
          name: data.name,
          email: data.email,
          profileBio: data.profileBio
        }));
  
        // Reload the page to ensure the cookie is available for useEffect to check
        window.location.reload();  // This forces a reload so the useEffect hook can detect the token
  
      } catch (error) {
        console.error("Error calling API:", error);
      }
    } else {
      alert("Invalid Credentials");
    }
  };
  
  
  
  



  const goToSignUp = () => {
    navigate('/signup');
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Paper sx={{ padding: 4, borderRadius: '20px', width: '100%', maxWidth: 400 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', marginRight: 2 }}>Turing</Typography>
          <img src={logo} alt="Logo" style={{ width: '50px', height: 'auto' }} />
        </Box>
        <Box component="form" noValidate autoComplete="off">
          <TextField fullWidth label="Username" value={username} onChange={(e) => setUsername(e.target.value)} sx={{ marginBottom: 3 }} />
          <TextField fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ marginBottom: 3 }} />
          <Button fullWidth variant="contained" sx={{ marginTop: 2 }} onClick={handleLogin}>Login</Button>
        </Box>
        <Button fullWidth variant="outlined" sx={{ marginTop: 3 }} onClick={goToSignUp}>Sign Up</Button>
      </Paper>
    </Container>
  );
}

export default Login;
