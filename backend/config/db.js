import mongoose from 'mongoose';
import { keyloader } from '../../keys.js';

let urls_database; // Declare a variable for the database

// Define the connectDB function to establish a connection with the MongoDB database
export const connectDB = async () => {
  try {
    // Connect to the MongoDB database using the URI from keyloader
    await mongoose.connect(keyloader.mongo_connection, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Access the default connection established by Mongoose
    const db = mongoose.connection;

    // Assign the 'urls' collection to the urls_database variable
    urls_database = db.collection('urls');

    // Log a message indicating that the connection to the database was successful
    console.log(`MongoDB Connected: ${db.host}`);

    // Return the reference to the 'urls' collection
    return urls_database;
  } catch (error) {
    // Log an error message and exit the process if an error occurs during the connection
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
