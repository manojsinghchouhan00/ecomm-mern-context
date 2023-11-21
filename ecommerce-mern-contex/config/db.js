import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`connect to the mongodb database ${conn.connection.host}`.blue)
    } catch (error) {
        console.log(`Error in mongo db ${error}`.red)
    }
};
export default connectDB;