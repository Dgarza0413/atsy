import mongoose from 'mongoose';

const connection = {};
const INIT_DB = process.env.INIT_DB || "mongodb://localhost/react-reserve"

const connectDb = async () => {

    console.log(process.env.INIT_DB)

    // use new db connection
    if (connection.isConnected) {

        //use exisiting database connection
        console.log('using exisiting database');
        return;
    }
    const db = await mongoose.connect(INIT_DB, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })

    connection.isConnected = db.connections[0].readyState;
    console.log(connection.isConnected)
}

export default connectDb;