import mongoose from 'mongoose';
import colors from 'colors';


const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser:true,
    useUnifiedTopology:true
        });
        console.log(`Conneted To Mongodb Database ${conn.connection.host}`.bgRed.white);

    } 
    catch (error) {
        console.log(`Error in mongodb ${error}`.bgMagenta.white);
    }
};


export default connectDb;
