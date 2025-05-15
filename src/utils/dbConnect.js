import mongoose from "mongoose";

export const connectDb = async()=>{

    try {
        await mongoose.connect(process.env.MONGODB_URL,{
            dbName:'Bookmanagement'
        })
        .then((db)=> console.log("Mongodb Connected: ",db.connection.host))
        .catch((err)=>{
            console.log("Error connecting to MongoDB : ",err.message)
        })
    } catch (error) {
            console.log("Error Connect to MongoDb ",error.message)
    }

}