const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Apex Bridge Database is connected and running at ${connect.connection.host}`)
    }catch(error){
        console.log(`Error making connection to the database`, error.message)
        process.exit(1);
    }
}

module.exports = connectDB;