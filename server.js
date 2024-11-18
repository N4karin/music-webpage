import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sendRoute from './src/api/send.js'; // Adjust the path as needed
import dotenv from 'dotenv'; // Import dotenv

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000; // Use environment variable or default to 3000

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Use the send route
app.use('/api/send', sendRoute);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
