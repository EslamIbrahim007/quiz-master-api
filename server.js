import dotenv from 'dotenv';
// Load env vars before using them
dotenv.config();

import express from 'express';
import cors from 'cors';
import { DBconnection } from './config/db.js';

const port = process.env.PORT || 5000;
const app = express();

// Import routes
import authRoutes from './routes/auth.route.js';
app.use('/api/auth', authRoutes);

// Middleware to parse JSON and URL-encoded data
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
DBconnection();
app.listen(port, () => console.log(`app listening on port ${port}!`));