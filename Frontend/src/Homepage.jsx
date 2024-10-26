import React, { useState } from 'react';
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const hardcodedEmail = 'omkar@example.com';
    const hardcodedPassword = 'password123';

    const handleLogin = () => {
        if (email === hardcodedEmail && password === hardcodedPassword) {
            navigate('/villages'); 
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <Container 
            maxWidth="xs" 
            sx={{ 
                mt: 5, 
                bgcolor: '#f9f9f9', 
                borderRadius: 2, 
                boxShadow: 3, 
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',  
            }}
        >
            <Typography variant="h4" align="center" gutterBottom>
                Login
            </Typography>
            {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
            <Box sx={{ width: '100%' }}>
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ bgcolor: 'white' }}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ bgcolor: 'white' }}
                />
                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleLogin}
                    sx={{
                        mt: 2,
                        bgcolor: '#1976d2',
                        '&:hover': {
                            bgcolor: '#115293',
                        },
                    }}
                >
                    Login
                </Button>
            </Box>
        </Container>
    );
};


export default LoginPage;
