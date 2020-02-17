import mongoose from 'mongoose';

const connection = {};
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/react-reserve"

const connectDb = async () => {

    // use new db connection
    if (connection.isConnected) {
        //use exisiting database connection
        return;
    }
    const db = await mongoose.connect(MONGODB_URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })

    connection.isConnected = db.connections[0].readyState;
}

export default connectDb;