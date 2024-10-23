const mongoose = require('mongoose');

const boothLeaderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    MobNo: { type: String, required: true },
    Comments: { type: String, default: '' },
});


const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, default: '' },
});

const villageSchema = new mongoose.Schema({
    villageName: { type: String, required: true },
    totalVotes: { type: Number, default: 220 },
    boothLeaders: [boothLeaderSchema],
    questions: [questionSchema],
});

module.exports = mongoose.model('Village', villageSchema);






