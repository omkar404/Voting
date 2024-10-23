const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const villagesRouter = require('./routes/villages');
const DailyUpdate = require('./routes/DailyUpdate');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Routes
app.use('/villages', villagesRouter);
app.use('/daily-update',DailyUpdate)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
