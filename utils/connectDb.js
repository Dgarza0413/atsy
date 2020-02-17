import mongoose from 'mongoose';

const connection = {};
const INIT_DB = process.env.INIT_DB || "mongodb://localhost/react-reserve"

const connectDb = async () => {

    // use new db connection
    if (connection.isConnected) {
        //use exisiting database connection
        return;
    }
    const db = await mongoose.connect(INIT_DB, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })

    connection.isConnected = db.connections[0].readyState;
}

export default connectDb;