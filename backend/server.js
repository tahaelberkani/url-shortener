import 'dotenv/config';
import debug from 'debug';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import urlRoutes from './routes/urlRoutes.js';
import { customErrorMiddleware } from './controllers/errorController.js';
import { connectDB } from './config/db.js';
import { keyloader } from '../keys.js';

// Initialize debug
const debugLogger = debug('app:startup');
debugLogger('SERVER1')

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());; // Parse incoming requests with JSON payloads
app.use(customErrorMiddleware);

// Verify Middleware Setup
// sending requests to the server with different content types
app.use((req, res, next) => {
  console.log('Request Body:', req.body.url); // Log the request body
  next();
});

// Set various HTTP headers for security
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", 'http://localhost:8001'], // Add the allowed sources for connections
    },
  })
);
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Routes
app.use('/', urlRoutes); // Use the URL routes defined in urlRoutes.js

// Set up the port
const PORT = keyloader.port_number; // Use the port_number from keyloader, default to 8001

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
