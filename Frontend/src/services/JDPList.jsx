// JDPList.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Typography, Box, Button } from '@mui/material';

const JDPList = () => {
    const [jdps, setJdps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchJDPs = async () => {
            try {
                const response = await axios.get('/api/jdps');
                setJdps(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching JDP data');
                setLoading(false);
            }
        };

        fetchJDPs();
    }, []);

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>{error}</Typography>;

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                JDPs
            </Typography>
            {jdps.map((jdp) => (
                <Box key={jdp._id} sx={{ mb: 2 }}>
                    <Link to={`/jdps/${jdp._id}`}>
                        <Button variant="outlined" sx={{ width: '100%' }}>
                            {jdp.name}
                        </Button>
                    </Link>
                </Box>
            ))}
        </Container>
    );
};

export default JDPList;