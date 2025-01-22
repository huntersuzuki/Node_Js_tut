const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/",{
            dbName:"bookstoreDB"
        })
        console.log("MongoDB Connected")
    }catch (e){
        console.error("MongoDB connection failed ",e)
        process.exit(1)
    }
}
module.exports = connectDB