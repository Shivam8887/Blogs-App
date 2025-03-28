const mongoose = require('mongoose');
require('dotenv').config();
const dbURL = process.env.DATABASE_URL;
exports.dbConnect = async ()=>{
    try{
        await mongoose.connect(dbURL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("DB Connection Successful")
    }catch(err){
        console.log("Error in DB Connection ")
        console.error(err);
    }
}