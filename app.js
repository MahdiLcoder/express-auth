import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import router from './routes/authRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();

// __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cookieParser())

// Connect to DB
connectDB(process.env.MONGO_URI);

// Use Routes
app.use('/', router);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Start server
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
