// models/JDP.js or wherever needed
import mongoose from 'mongoose';

// Define the booth leader schema
const boothLeaderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    leader: { type: String, required: true },
    boothLeader: { type: String, required: true },
    MobNo: { type: String, required: true },
    Comments: { type: String, default: '' },
});

// Define the question schema
const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, default: '' },
});

// Define the village schema
const villageSchema = new mongoose.Schema({
    villageName: { type: String, required: true },
    totalVotes: { type: Number, default: 220 },
    boothLeaders: [boothLeaderSchema],
    questions: [questionSchema],
});

// Define the JDP schema
const jdpSchema = new mongoose.Schema({
    name: { type: String, required: true },
    villages: [villageSchema],
    leaders: [{ name: { type: String, required: true } }],
});

// Create a model from the schema
const JDP = mongoose.model('JDP', jdpSchema);

export default JDP;
