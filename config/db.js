import mongoose from 'mongoose';

const connectDB = async (DATABASE_URL) => {
    try {
        await mongoose.connect(DATABASE_URL)
        console.log('MongoDB connected');
    } catch (err) {

        console.error('error connection to db', err);
    }

}

export default connectDB;   