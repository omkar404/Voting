import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
    TextField,
    Button,
    Box,
    Container,
    Snackbar,
    Alert,
    Grid,
    Table,
    Typography,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
} from '@mui/material';
import axios from 'axios';

const BoothLeaderForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [villages, setVillages] = useState([]);
    const [localVillageName, setLocalVillageName] = useState(location.state?.villageName || '');
    const [localLeaderName, setLocalLeaderName] = useState(location.state?.leaderName || '');
    const [localTabName, setLocalTabName] = useState(location.state?.tabName || '');
    const [submittedData, setSubmittedData] = useState([]);

    const [boothLeaders, setBoothLeaders] = useState([{ name: '', MobNo: '', Comments: '' }]);
    const [answers, setAnswers] = useState(Array(5).fill(''));
    const [errorFields, setErrorFields] = useState({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        const fetchVillages = async () => {
            try {
                const response = await axios.get('https://voting-backend-qbcz.onrender.com/villages');
                setVillages(response.data.villages);
                setSubmittedData(response.data); // Store fetched data
            } catch (error) {
                console.error('Error fetching village data:', error);
            }
        };
        fetchVillages();
    }, []);

    // Other functions remain unchanged...
    useEffect(() => {
        const fetchVillages = async () => {
            try {
                const response = await axios.get('https://voting-backend-qbcz.onrender.com/villages');
                console.log(response.data); // Log the data for debugging
                setVillages(response.data.villages); // Set the villages array
            } catch (error) {
                console.error('Error fetching village data:', error);
            }
        };

        fetchVillages();
    }, []);




    const handleAddLeader = async () => {
        const newJDP = {
            name: `${localTabName}`,
            villages: [{
                name: localTabName,
                villageName: localVillageName,
                boothLeaders: boothLeaders.map(({ name, MobNo, Comments }) => ({
                    name,
                    leader: localLeaderName,
                    boothLeader: name,
                    MobNo,
                    Comments,
                })),
                questions: [
                    { question: 'No of difference parties available in village', answer: answers[0] || '' },
                    { question: 'How can we improve local services?', answer: answers[1] || '' },
                    { question: 'What events do you wish to see organized?', answer: answers[2] || '' },
                    { question: 'Any additional comments?', answer: answers[3] || '' },
                    { question: 'What other suggestions do you have for improvement?', answer: answers[4] || '' },
                ],
            }],
            leaders: [{ name: localLeaderName }],
        };

        try {
            await axios.post('http://localhost:5000/villages', newJDP);
            // Reset form data
            resetForm();
            setLocalVillageName('');
            setLocalLeaderName('');
            setLocalTabName('');


            // Redirect to the same page
            navigate(location.pathname, { replace: true }); // Use location.pathname to stay on the same page
            setSnackbarMessage('Village added successfully!');
            setSnackbarSeverity('success');


        } catch (error) {
            console.error('Error adding village:', error);
            const errorMessage = error.response?.data?.message || 'Failed to add village. Please try again.';
            setSnackbarMessage(errorMessage);
            setSnackbarSeverity('error');
        }

        setSnackbarOpen(true);
    };

    const resetForm = () => {
        setBoothLeaders([{ name: '', MobNo: '', Comments: '' }]);
        setAnswers(Array(5).fill(''));
        setErrorFields({});
    };

    const updateBoothLeader = (index, field, value) => {
        setBoothLeaders((prevLeaders) => {
            const newLeaders = [...prevLeaders];
            newLeaders[index][field] = value;
            return newLeaders;
        });
    };

    const handleAnswerChange = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };
    return (
        <Container maxWidth="lg" sx={{ mt: 5 }}>
            <Typography variant="h4" gutterBottom align="center">
                Booth Leader Form
            </Typography>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="outlined" component={Link} to="/villages" sx={{ mb: 2 }}>
                    Back to Home
                </Button>
            </Box>

            <Box sx={{ mb: 4 }}>
                <Typography variant="body1">
                    <strong>Selected Village:</strong> {localVillageName || 'N/A'}
                </Typography>
                <Typography variant="body1">
                    <strong>Selected Leader:</strong> {localLeaderName || 'N/A'}
                </Typography>
                <Typography variant="body1">
                    <strong>Selected Tab:</strong> {localTabName || 'N/A'}
                </Typography>
            </Box>

            <Grid container spacing={4}>
                {boothLeaders.map((leader, index) => (
                    <Grid item xs={12} key={index}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Booth Leader Name"
                                    value={leader.name}
                                    onChange={(e) => updateBoothLeader(index, 'name', e.target.value)}
                                    variant="outlined"
                                    fullWidth
                                    error={!!errorFields[`leaderName${index}`]}
                                    helperText={errorFields[`leaderName${index}`] ? 'Required' : ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Contact Number"
                                    value={leader.MobNo}
                                    onChange={(e) => updateBoothLeader(index, 'MobNo', e.target.value)}
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label="Comments"
                                    value={leader.Comments}
                                    onChange={(e) => updateBoothLeader(index, 'Comments', e.target.value)}
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                ))}
            </Grid>

            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                Additional Questions
            </Typography>
            <Grid container spacing={2}>
                {[
                    'No of difference parties available in village',
                    'No of Tarun mandal list, number?',
                    'No of society?',
                    'No Of dairys?',
                    'Any community or leader. Example: patil, shimpi, parit, Desai, etc. they have some big community or group etc',
                ].map((question, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <TextField
                            variant="outlined"
                            label={question}
                            value={answers[index]}
                            onChange={(e) => handleAnswerChange(index, e.target.value)}
                            fullWidth
                            error={!!errorFields[`answer${index}`]}
                            helperText={errorFields[`answer${index}`] ? 'Required' : ''}
                        />
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="contained" onClick={handleAddLeader}>
                    Add Village
                </Button>
                <Button variant="outlined" component={Link} to="/daily-update" sx={{ mb: 2 }}>
                    Daily Update
                </Button>
            </Box>

            {/* Table Container */}
            <Box sx={{ mt: 5 }}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>JDP Name</strong></TableCell>
                                <TableCell><strong>Village Name</strong></TableCell>
                                <TableCell><strong>Total Votes</strong></TableCell>
                                <TableCell><strong>Booth Leaders</strong></TableCell>
                                <TableCell><strong>Questions</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {submittedData.map((jdp) => (
                                jdp.villages.map((village) => (
                                    <TableRow key={village._id}>
                                        <TableCell>{jdp.name}</TableCell>
                                        <TableCell>{village.villageName}</TableCell>
                                        <TableCell>{village.totalVotes}</TableCell>
                                        <TableCell>
                                            {village.boothLeaders.map((leader) => (
                                                <div key={leader._id}>
                                                    {leader.name} ({leader.MobNo})
                                                </div>
                                            ))}
                                        </TableCell>
                                        <TableCell>
                                            {village.questions.map((q) => (
                                                <div key={q._id}>
                                                    {q.question}: {q.answer}
                                                </div>
                                            ))}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            {/* Snackbar for messages */}
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};
    
    

export default BoothLeaderForm;





















