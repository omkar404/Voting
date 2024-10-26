import React, { useState } from 'react';
import { Box, Button, FormControl, Select, MenuItem, Tabs, Tab, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import jdpData from '../../Backend/services/jdp'; // Adjust the path as necessary

const VillageTabs = () => {
    const navigate = useNavigate();
    const [selectedVillage, setSelectedVillage] = useState('');
    const [selectedLeader, setSelectedLeader] = useState('');
    const [activeTab, setActiveTab] = useState(0); 
    const [villagesData, setVillagesData] = useState(jdpData[0]?.villages || []); // Set initial villages
    const [leadersData, setLeadersData] = useState(jdpData[0]?.leaders || []); // Set initial leaders

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
        setVillagesData(jdpData[newValue]?.villages || []); 
        setLeadersData(jdpData[newValue]?.leaders || []); 
        setSelectedVillage(''); 
        setSelectedLeader(''); 

        // Log the active tab index and name
        const activeTabName = jdpData[newValue]?.name;
        console.log(`Active Tab Index: ${newValue}, Name: ${activeTabName}`);
    };

    const handleVillageChange = (event) => {
        setSelectedVillage(event.target.value);
        setSelectedLeader(''); // Reset selected leader when village changes
    };

    const handleLeaderChange = (event) => {
        setSelectedLeader(event.target.value);
    };

    const handleMapToForm = () => {
        const village = villagesData.find(v => v.villageName === selectedVillage);
        const leader = leadersData.find(l => l.name === selectedLeader);
    
        if (village && leader) {
            const activeTabName = jdpData[activeTab]?.name; // Get the active tab name
            navigate('/Boothleader', {
                state: { 
                    villageName: village.villageName, 
                    leaderName: leader.name,
                    tabName: activeTabName, // Pass the active tab name
                }
            });
        } else {
            alert("Please select valid village and leader.");
        }
    };    

    return (
        <Box sx={{ width: '100%', mt: 4 }}>
            <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
                Village Management
            </Typography>
            <Tabs value={activeTab} onChange={handleTabChange} aria-label="village tabs" sx={{ mb: 2 }}>
                {jdpData.map((jdp, index) => (
                    <Tab label={jdp.name} key={index} />
                ))}
            </Tabs>

            <Grid container spacing={3} sx={{ mb: 2 }}>
                {/* Dropdown for Villages */}
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined" sx={{ bgcolor: '#f5f5f5' }}>
                        <Select
                            value={selectedVillage}
                            onChange={handleVillageChange}
                            displayEmpty
                            sx={{
                                '& .MuiSelect-select': {
                                    padding: '10px 14px',
                                },
                                '&:hover': {
                                    bgcolor: '#e0e0e0',
                                },
                            }}
                        >
                            <MenuItem value="">
                                <em>Select Village</em>
                            </MenuItem>
                            {villagesData.map((village, index) => (
                                <MenuItem key={index} value={village.villageName}>
                                    {village.villageName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                {/* Dropdown for Booth Leaders */}
                {selectedVillage && (
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth variant="outlined" sx={{ bgcolor: '#f5f5f5' }}>
                            <Select
                                value={selectedLeader}
                                onChange={handleLeaderChange}
                                displayEmpty
                                sx={{
                                    '& .MuiSelect-select': {
                                        padding: '10px 14px',
                                    },
                                    '&:hover': {
                                        bgcolor: '#e0e0e0',
                                    },
                                }}
                            >
                                <MenuItem value="">
                                    <em>Select Booth Leader</em>
                                </MenuItem>
                                {leadersData.map((leader, index) => (
                                    <MenuItem key={index} value={leader.name}>
                                        {leader.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                )}
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button
                    variant="contained"
                    onClick={handleMapToForm}
                    disabled={!selectedVillage || !selectedLeader}
                    sx={{
                        bgcolor: '#1976d2',
                        '&:hover': {
                            bgcolor: '#115293',
                        },
                        padding: '10px 20px',
                    }}
                >
                   Leader Form
                </Button>
            </Box>
        </Box>
    );
};
    

export default VillageTabs;
