import mongoose from "mongoose";


// async connect to mongo db and error handling//
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected...");
    }
    catch (error) {
        console.log("MongoDB connection error:", error)

    }
}

export default connectDB