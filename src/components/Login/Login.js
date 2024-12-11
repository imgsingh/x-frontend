import React, { useState } from 'react';
import { TextField, Button, Box, Container, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../../components/Login/logo.png'; // Adjust path

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function validateEmail(email) {
    // Regular expression to validate the email format
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
  }

  const handleLogin = () => {
    // const storedCredentials = JSON.parse(localStorage.getItem('credentials')) || {};
    // if (storedCredentials.username === username && storedCredentials.password === password) {
    //   alert('Login successful!');
    // } else {
    //   alert('Invalid username or password!');
    // }

    if (validateEmail(username) && password != '') {
      fetch("http://twitter-team-turning-testers-19648cf420b7.herokuapp.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "email": username,
          "password": password,
        })
      })
        .then((response) => response.json())
        .then((data) => {
          const expirationDate = new Date();
          expirationDate.setFullYear(expirationDate.getFullYear() + 20);

          document.cookie = `token=${data.token}; expires=${expirationDate.toUTCString()}; path=/`;

          localStorage.setItem("userDetails", JSON.stringify({
            userId: data.userId,
            name: data.name,
            email: data.email,
            profileBio: data.profileBio
          }));
        })
        .catch((error) => console.error("Error calling API:", error));
    } else {
      alert("Invalid Credentials")
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
