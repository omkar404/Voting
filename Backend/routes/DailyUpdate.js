import express from 'express';
const router = express.Router();
import DailyUpdate from '../Models/DailyUpdate.js';

router.get('/', async (req, res) => {
    try {
        const dailyUpdate = await DailyUpdate.find();
        res.json(dailyUpdate);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const dailyUpdate = new DailyUpdate(req.body);
        await dailyUpdate.save();
        res.status(201).json(dailyUpdate);
    } catch (error) {
        console.error('Error saving daily update:', error);
        res.status(400).json({ message: 'Error saving daily update', error });
    }
});
export default router;