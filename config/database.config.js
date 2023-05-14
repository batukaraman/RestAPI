import mongoose from "mongoose";

function databaseConnection() {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewURLParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log(`Database Connection Successful`);
    }).catch((err) => {
        console.log(`Database Connection Failed! ${err.message}`);
    });
}

export default databaseConnection