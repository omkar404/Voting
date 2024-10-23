import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Box,
    Typography,
    Container,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableContainer,
    Paper,
    Autocomplete,
    Grid,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DailyUpdateForm = () => {
    const navigate = useNavigate();
    const [villages, setVillages] = useState([]);
    const [selectedVillage, setSelectedVillage] = useState('');
    const [boothLeaders, setBoothLeaders] = useState([{ name: '', MobNo: '' }]);
    const [inputs, setInputs] = useState({ A: '', B: '', C: '', comments: '' });
    const [allLeaders, setAllLeaders] = useState([]);
    const [dailyUpdates, setDailyUpdates] = useState([]); 

    // Fetch villages and booth leaders for selection
    useEffect(() => {
        const fetchData = async () => {
            try {
                const villagesResponse = await axios.get('http://localhost:5000/villages');
                const leadersResponse = await axios.get('http://localhost:5000/villages/booth-leaders');
                const updatesResponse = await axios.get('http://localhost:5000/daily-update'); 
                setVillages(villagesResponse.data);
                setAllLeaders(leadersResponse.data);
                setDailyUpdates(updatesResponse.data); 
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    // Handle form submission
    const handleSubmit = async () => {
        const dailyUpdate = {
            village: selectedVillage,
            boothLeaders,
            inputs,
        };

        try {
            await axios.post('http://localhost:5000/daily-update', dailyUpdate);
            alert('Daily update saved successfully!');
            setSelectedVillage('');
            setBoothLeaders([{ name: '', MobNo: '' }]);
            setInputs({ A: '', B: '', C: '', comments: '' });
            
            const updatesResponse = await axios.get('http://localhost:5000/daily-updates');
            setDailyUpdates(updatesResponse.data);
        } catch (error) {
            console.error('Error saving daily update:', error);
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 5 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Daily Update Form
            </Typography>
            <Box sx={{ mb: 4, p: 3, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                <TextField
                    select
                    label="Select Village"
                    value={selectedVillage}
                    onChange={(e) => setSelectedVillage(e.target.value)}
                    fullWidth
                    sx={{ mb: 2 }}
                >
                    {villages.map((village) => (
                        <MenuItem key={village._id} value={village.villageName}>
                            {village.villageName}
                        </MenuItem>
                    ))}
                </TextField>

                {boothLeaders.map((leader, index) => (
                    <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
                        <Grid item xs={12} sm={6}>
                            <Autocomplete
                                options={allLeaders}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Booth Leader Name"
                                        variant="outlined"
                                        fullWidth
                                    />
                                )}
                                onChange={(event, newValue) => {
                                    const newLeaders = [...boothLeaders];
                                    newLeaders[index].name = newValue ? newValue.name : '';
                                    newLeaders[index].MobNo = newValue ? newValue.MobNo : '';
                                    setBoothLeaders(newLeaders);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Autocomplete
                                options={allLeaders}
                                getOptionLabel={(option) => option.MobNo}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Mobile Number"
                                        variant="outlined"
                                        fullWidth
                                    />
                                )}
                                onChange={(event, newValue) => {
                                    const newLeaders = [...boothLeaders];
                                    newLeaders[index].MobNo = newValue ? newValue.MobNo : '';
                                    setBoothLeaders(newLeaders);
                                }}
                            />
                        </Grid>
                    </Grid>
                ))}

                {/* Input fields A, B, C */}
                <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Input A"
                            value={inputs.A}
                            onChange={(e) => setInputs({ ...inputs, A: e.target.value })}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Input B"
                            value={inputs.B}
                            onChange={(e) => setInputs({ ...inputs, B: e.target.value })}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Input C"
                            value={inputs.C}
                            onChange={(e) => setInputs({ ...inputs, C: e.target.value })}
                            fullWidth
                        />
                    </Grid>
                </Grid>

                <TextField
                    label="Comments"
                    multiline
                    rows={4}
                    value={inputs.comments}
                    onChange={(e) => setInputs({ ...inputs, comments: e.target.value })}
                    fullWidth
                    sx={{ mb: 2 }}
                />

                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{ mr: 2 }}
                >
                    Save Daily Update
                </Button>
                <Button variant="outlined" onClick={() => navigate('/')} sx={{ ml: 2 }}>
                    Back
                </Button>
            </Box>

            {/* Daily Updates Table */}
            <Typography variant="h5" gutterBottom>
                Daily Updates
            </Typography>
            <TableContainer component={Paper} sx={{ mb: 5 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Village</strong></TableCell>
                            <TableCell><strong>Booth Leaders</strong></TableCell>
                            <TableCell><strong>Input A</strong></TableCell>
                            <TableCell><strong>Input B</strong></TableCell>
                            <TableCell><strong>Input C</strong></TableCell>
                            <TableCell><strong>Comments</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dailyUpdates.map((update, idx) => (
                            <TableRow key={idx}>
                                <TableCell>{update.village}</TableCell>
                                <TableCell>
                                    {update.boothLeaders.map((leader, idx) => (
                                        <div key={idx}>
                                            {leader.name} ({leader.MobNo})
                                        </div>
                                    ))}
                                </TableCell>
                                <TableCell>{update.inputs.A}</TableCell>
                                <TableCell>{update.inputs.B}</TableCell>
                                <TableCell>{update.inputs.C}</TableCell>
                                <TableCell>{update.inputs.comments}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default DailyUpdateForm;