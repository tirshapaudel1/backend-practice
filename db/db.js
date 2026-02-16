//tirshapaudel_db_user
//cxOFwXAj0u942Mzz

const mongoose = require("mongoose")

const DB_URL ="mongodb+srv://tirshapaudel_db_user:cxOFwXAj0u942Mzz@cluster0.npxhmyc.mongodb.net/";

const connectToDatabase = async() => {
    try {
        await mongoose.connect(DB_URL);
        console.log("Database is connected");
        
    } catch (error)
     {
    console.log(`Database connection error is ${error}`);   
    }
}

module.exports = connectToDatabase;