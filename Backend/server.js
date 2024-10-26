import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import villagesRouter from './routes/villages.js';
import DailyUpdate from './routes/DailyUpdate.js';
import jdpData from './services/jdp.js';
import JDP from './Models/Village.js';

dotenv.config();

const app = express();

app.use(cors({
    //origin: 'http://localhost:3000', // Update this to your front-end URL
}));
app.use(express.json());

const PORT = process.env.PORT || 5000;



    const connectDB = async () => {
        try {
            await mongoose.connect(process.env.MONGODB_URI),
                console.log('MongoDB connected');
            } catch (error) {
                console.error('MongoDB connection error:', error);
                process.exit(1); // Exit the process if connection fails
            }
        };

    const seedDatabase = async () => {
        try {
            // Clear existing JDPs if necessary
            await JDP.deleteMany({});
            // Insert the new JDP data
            await JDP.insertMany(jdpData);
            console.log('JDP data seeded successfully');
        } catch (error) {
            console.error('Error seeding database:', error);
        }
    };



const startServer = async () => {
    await connectDB();
    await seedDatabase(); // Only seed if you want to initialize data
    app.use('/villages', villagesRouter);
    app.use('/daily-update', DailyUpdate);
    // app.use('/', (req, res) => {
    //     res.json({ message: 'Hello, World!' });
    // e});

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
app.use('/', (req, res) => {
        res.json({ message: 'Hello, World!' });
    e});
startServer();
