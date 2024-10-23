import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    TextField,
    Button,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableContainer,
    Paper,
    Autocomplete,
    Typography,
    Container,
    Grid,
    Snackbar,
    Alert,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import villagesData from './services/villagesData'; 
import leadersData from './services/leadersData';   
import axios from 'axios';

function BoothLeaderForm() {
    // State Variables
    const [villages, setVillages] = useState([]);
    const [villageName, setVillageName] = useState('');
    const [boothLeaders, setBoothLeaders] = useState([{ name: '', MobNo: '', Comments: '' }]);
    const [answers, setAnswers] = useState(Array(5).fill(''));
    const [errorFields, setErrorFields] = useState({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    // Fetch village data from backend
    useEffect(() => {
        const fetchVillages = async () => {
            try {
                const response = await axios.get('http://localhost:5000/villages'); // Adjust the URL as necessary
                setVillages(response.data);
            } catch (error) {
                console.error('Error fetching village data:', error);
            }
        };

        fetchVillages();
    }, []);

    // Handle adding a new village
    const handleAddVillage  = async () => {
        // Reset error fields
        setErrorFields({});

        // Validation
        const newErrorFields = {};
        if (!villageName) newErrorFields.villageName = true;

        boothLeaders.forEach((leader, index) => {
            if (!leader.name) newErrorFields[`leaderName${index}`] = true;
            if (!leader.MobNo || !/^\d{10}$/.test(leader.MobNo)) {
                newErrorFields[`leaderMobNo${index}`] = true;
            }
        });

        answers.forEach((answer, index) => {
            if (!answer) newErrorFields[`answer${index}`] = true;
        });

        if (Object.keys(newErrorFields).length > 0) {
            setErrorFields(newErrorFields);
            setSnackbarMessage('Please fill in all required fields correctly.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        const newVillage = {
            villageName,
            boothLeaders,
            questions: [
                { question: 'What is the main issue in your village?', answer: answers[0] || '' },
                { question: 'How can we improve local services?', answer: answers[1] || '' },
                { question: 'What events do you wish to see organized?', answer: answers[2] || '' },
                { question: 'Any additional comments?', answer: answers[3] || '' },
                { question: 'What other suggestions do you have for improvement?', answer: answers[4] || '' },
            ],
        };
        try {
            const response = await axios.post('http://localhost:5000/villages', newVillage);
            setVillages([...villages, response.data]); // Update state with new village
            resetForm();
            setSnackbarMessage('Village added successfully!');
            setSnackbarSeverity('success');
        } catch (error) {
            console.error('Error adding village:', error);
            setSnackbarMessage(error.response ? error.response.data : 'Failed to add village. Please try again.');
            setSnackbarSeverity('error');
        }
    
        setSnackbarOpen(true);

        setVillages([...villages, newVillage]);
        resetForm();
        setSnackbarMessage('Village added successfully!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
    };

    // Reset form fields
    const resetForm = () => {
        setVillageName('');
        setBoothLeaders([{ name: '', MobNo: '', Comments: '' }]);
        setAnswers(Array(5).fill(''));
        setErrorFields({});
    };

    // Update booth leader details
    const updateBoothLeader = (index, field, value) => {
        setBoothLeaders((prevLeaders) => {
            const newLeaders = [...prevLeaders];
            newLeaders[index][field] = value;
            return newLeaders;
        });
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 5 }}>
            <Button
                variant="outlined"
                component={Link}
                to="/daily-update"
                sx={{ mb: 2, float: 'right' }}
            >
                Daily Update
            </Button>
            <Typography variant="h4" align="center" gutterBottom sx={{ fontSize: '2rem' }}>
                Village and Booth Leader Management
            </Typography>
            <Box sx={{ mb: 4, p: 3, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                {/* Village Name Input */}
                <Autocomplete
                    options={villagesData.map((v) => v.villageName)}
                    onChange={(e, newValue) => setVillageName(newValue)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Village Name"
                            variant="outlined"
                            fullWidth
                            error={!!errorFields.villageName}
                            helperText={errorFields.villageName ? 'Required' : ''}
                        />
                    )}
                />

                {/* Booth Leaders Input */}
                {boothLeaders.map((leader, index) => (
                    <Grid container spacing={2} key={index} sx={{ mt: 2 }}>
                        <Grid item xs={12} sm={6} md={4}>
                            <Autocomplete
                                options={leadersData}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Booth Leader Name"
                                        variant="outlined"
                                        fullWidth
                                        error={!!errorFields[`leaderName${index}`]}
                                        helperText={errorFields[`leaderName${index}`] ? 'Required' : ''}
                                    />
                                )}
                                onChange={(event, newValue) => {
                                    updateBoothLeader(index, 'name', newValue ? newValue.name : '');
                                    updateBoothLeader(index, 'MobNo', newValue ? newValue.MobNo : '');
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                label="Mobile Number"
                                value={leader.MobNo}
                                onChange={(e) => updateBoothLeader(index, 'MobNo', e.target.value)}
                                variant="outlined"
                                fullWidth
                                error={!!errorFields[`leaderMobNo${index}`]}
                                helperText={errorFields[`leaderMobNo${index}`] ? 'Must be a 10-digit number' : ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                            <TextField
                                label="Comments"
                                value={leader.Comments}
                                onChange={(e) => updateBoothLeader(index, 'Comments', e.target.value)}
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                ))}

                {/* Questions Section */}
                <Typography variant="h6" sx={{ mt: 4, fontSize: '1.5rem' }}>Questions</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {['No of difference parties available in village ?',
                        'No of Tarun mandal list, number ?',
                        'No of society ?',
                        'No. Of dairy ?',
                        'Any community or leader. Example patil, shimpu, parit, Desai etc?'].map((question, index) => (
                            <Grid container key={index} spacing={2} alignItems="center">
                                <Grid item xs={12} sm={6} md={6}>
                                    <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>{question}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <TextField
                                        variant="outlined"
                                        value={answers[index]}
                                        onChange={(e) => {
                                            const newAnswers = [...answers];
                                            newAnswers[index] = e.target.value;
                                            setAnswers(newAnswers);
                                        }}
                                        fullWidth
                                        error={!!errorFields[`answer${index}`]}
                                        helperText={errorFields[`answer${index}`] ? 'Required' : ''}
                                    />
                                </Grid>
                            </Grid>
                        ))}
                </Box>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddVillage}
                    sx={{ mt: 3 }}
                >
                    Add Village
                </Button>
            </Box>

            {/* Village Data Table with Scroll */}
            <TableContainer component={Paper} sx={{ maxHeight: 400, overflow: 'auto' }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong style={{ fontSize: '1.2rem' }}>Village Name</strong></TableCell>
                            <TableCell><strong style={{ fontSize: '1.2rem' }}>Booth Leaders</strong></TableCell>
                            <TableCell><strong style={{ fontSize: '1.2rem' }}>Questions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {villages.map((village) => (
                            <TableRow key={village.villageName}>
                                <TableCell>{village.villageName}</TableCell>
                                <TableCell>
                                    {village.boothLeaders.map((leader, i) => (
                                        <div key={i}>
                                            {leader.name} ({leader.MobNo}) - {leader.Comments}
                                        </div>
                                    ))}
                                </TableCell>
                                <TableCell>
                                    {village.questions.map((q, i) => (
                                        <div key={i}>{q.question}: {q.answer}</div>
                                    ))}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Snackbar for messages */}
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default BoothLeaderForm;