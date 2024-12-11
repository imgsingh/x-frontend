import React, { useState } from 'react';
import { TextField, Button, Box, Container, Paper, Typography } from '@mui/material';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    if (name && email && username && password) {
      alert(`Sign Up Successful!\n\nName: ${name}\nEmail: ${email}\nUsername: ${username}`);
    } else {
      alert('Please fill out all fields!');
    }
  };

  return (
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
  );
}

export default SignUp;
