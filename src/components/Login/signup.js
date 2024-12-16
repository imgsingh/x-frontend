import React, { useState } from 'react';
import { TextField, Button, Box, Container, Paper, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleSignUp = () => {
    if (name && email && username && password) {
      handleSignUpCall()
    } else {
      alert('Please fill out all fields!');
    }
  };

  function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
  }


  const handleSignUpCall = async () => {
    if (validateEmail(email) && password !== '') {
      try {
        const response = await fetch("http://twitter-team-turning-testers-19648cf420b7.herokuapp.com/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            "email": email,
            "password": password,
            "name": name,
            "roles":["ADMIN","USER"]
          })
        });

        const data = await response.json();

        if (!response.ok || typeof data.token !== "undefined") {
          toast.success("Success: " + "You registration is successful");
          navigate('/login');

        } else {
          toast.error("Invalid Credentials")
        }

      } catch (error) {
        console.error("Error calling API:", error);
      }
    } else {
      alert("Invalid Credentials");
    }
  };


  return (
    <>
    <ToastContainer />
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#ffffff',
        padding: 0,
      }}
    >
      <Paper
        sx={{
          padding: 4,
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: 400,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 3,
            color: '#333',
          }}
        >
          Sign Up
        </Typography>

        <Box component="form" noValidate autoComplete="off">
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            sx={{ marginBottom: 3, borderRadius: '10px' }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            sx={{ marginBottom: 3, borderRadius: '10px' }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            sx={{ marginBottom: 3, borderRadius: '10px' }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            sx={{ marginBottom: 3, borderRadius: '10px' }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{
              marginTop: 2,
              padding: '15px',
              backgroundColor: '#4caf50',
              color: 'white',
              borderRadius: '10px',
              '&:hover': {
                backgroundColor: '#45a049',
              },
            }}
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
        </Box>
      </Paper>
    </Container>
    </>
  );
}

export default SignUp;
