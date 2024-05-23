import mongoose from 'mongoose';
import { AppEnviroment } from './enviroment';

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(AppEnviroment.DATABASE_URL, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            autoIndex:true
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

export default connectDB;
