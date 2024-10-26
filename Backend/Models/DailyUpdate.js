import mongoose from 'mongoose';

const boothLeaderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    MobNo: { type: String, required: true },
});

const dailyUpdateSchema = new mongoose.Schema({
    village: { type: String, required: true },
    boothLeaders: [boothLeaderSchema],
    inputs: {
        A: { type: String, required: true },
        B: { type: String, required: true },
        C: { type: String, required: true },
        comments: { type: String },
    },
}, { timestamps: true });

const DailyUpdate = mongoose.model('DailyUpdate', dailyUpdateSchema);

export default DailyUpdate;
