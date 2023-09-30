import mongoose from 'mongoose'

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: process.env.MONGODBDB_NAME,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        isConnected = true;
        console.log('mongoDB Connected');
    } catch (err) {
        console.log(err);
    }
}