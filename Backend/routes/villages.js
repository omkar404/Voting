import express from 'express';
const router = express.Router();
import JDP from '../Models/Village.js'; 


router.get('/', async (req, res) => {
    try {
        const villages = await JDP.find(); 
        res.json(villages);
    } catch (error) {
        console.error('Error fetching villages:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Add a new village
router.post('/', async (req, res) => {
    try {
        const newJDP = new JDP(req.body);
        await newJDP.save();
        res.status(201).json(newJDP);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Get all booth leaders from all villages
router.get('/booth-leaders', async (req, res) => {
    try {
        const villages = await JDP.find();
        const boothLeaders = villages.flatMap(village => 
            village.boothLeaders.map(leader => ({
                name: leader.name,
                MobNo: leader.MobNo,
                id: leader._id // Include the ID if needed
            }))
        );
        res.json(boothLeaders);
    } catch (error) {
        console.error('Error fetching booth leaders:', error);
        res.status(500).send('Server error');
    }
});

export default router; // Use export default instead of module.exports
