import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import urlRoutes from './routes/urlRoutes.js';
import { connectDB } from './config/db.js';
import { keyloader } from '../keys.js';

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // Parse incoming requests with JSON payloads
// Set various HTTP headers for security
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", 'http://localhost:8000'], // Add the allowed sources for connections
    },
  })
);
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Routes
app.use('/urls', urlRoutes); // Use the URL routes defined in urlRoutes.js

// Set up the port
const PORT = keyloader.port_number || 8000; // Use the port_number from keyloader, default to 8000

// Connect to the MongoDB database
connectDB()
  .then((urls_database) => {
    app.locals.urls_database = urls_database; // Make the database accessible in the app's locals

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit the process if there's an error connecting to the database
  });
