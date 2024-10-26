// JDPDetail.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Box, Button } from '@mui/material';

const JDPDetail = () => {
    const { jdpId } = useParams(); // Get JDP ID from URL
    const [jdp, setJdp] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchJDP = async () => {
            try {
                const response = await axios.get(`/api/jdps/${jdpId}`);
                setJdp(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching JDP data');
                setLoading(false);
            }
        };

        fetchJDP();
    }, [jdpId]);

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>{error}</Typography>;

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                {jdp.name}
            </Typography>
            {jdp.villages.map((village) => (
                <Box key={village.villageName} sx={{ mb: 2 }}>
                    <Typography variant="h6">{village.villageName}</Typography>
                    <Typography>Booth Leaders:</Typography>
                    {village.boothLeaders.map((leader) => (
                        <Typography key={leader.name}>{leader.name}</Typography>
                    ))}
                </Box>
            ))}
            <Button variant="contained" href="/villages">
                Back to Villages
            </Button>
        </Container>
    );
};

export default JDPDetail;