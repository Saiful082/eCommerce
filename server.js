import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from 'morgan';
import connectDb from "./config/db.js";
import authRoutes from './routes/authRoute.js'
import cors from 'cors';
import categoryRoutes from "./routes/categoryRoutes.js";

// Configure env
dotenv.config();

// Database config
connectDb();


// rest Onject
const app = express();

// middelwares 
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);

// Rest Api
app.get('/', (req, res) => {
res.send('<h1> Welcome To eCommerce app</h1>')
   


});

// Port 
const PORT = process.env.PORT || 8080;

// Run listen 
app.listen(PORT, () => {
    console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgGreen.white);
})
