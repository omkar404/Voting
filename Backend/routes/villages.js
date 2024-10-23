const express = require('express');
const router = express.Router();
const Village = require('../Models/Village');

router.get('/', async (req, res) => {
    try {
        const villages = await Village.find();
        res.json(villages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new village
router.post('/', async (req, res) => {
    const village = new Village(req.body);
    try {
        const newVillage = await village.save();
        res.status(201).json(newVillage);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Get all booth leaders from all villages
router.get('/booth-leaders', async (req, res) => {
    try {
        const villages = await Village.find();
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



module.exports = router;