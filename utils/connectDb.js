// const app = express();
import mongoose from "mongoose"

const connection = {};
// const PORT = process.env.PORT || 3001
const INIT_DB = process.env.INIT_DB || "mongodb://localhost/react-reserve"

const connectDb = async () => {

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
    console.log("db connected")
    connection.isConnected = db.connections[0].readyState;
}


// app.listen(PORT, function () {
//     console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
// });

export default connectDb;