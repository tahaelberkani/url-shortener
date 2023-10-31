import randomstring from 'randomstring';
import { Url } from '../models/urlModel.js';

// Controller function to check server status
export const checkHealth = async (req, res) => {
  res.status(200).send({ message: 'Server is running and healthy.' });
};

// Controller function to create a shortened URL
export const createShortUrl = async (req, res) => {
  try {
    const originalUrl = "http://short-url.com";
    const shortCode = randomstring.generate(7);
    const newUrl = new Url({ originalUrl, shortCode });
    await newUrl.save(); // Save the new URL to the database
    res.status(201).json(newUrl); // Return the newly created URL
  } catch (error) {
    res.status(500).json({ message: 'Server Error' }); // Handle server errors
  }
};

// Controller function to redirect to the original URL from the shortened URL
export const redirectShortUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const url = await Url.findOne({ shortCode }); // Find the URL in the database using the short code
    if (!url) {
      return res.status(404).json({ message: 'URL not found' }); // Return a 404 error if the URL is not found
    }
    res.redirect(url.originalUrl); // Redirect to the original URL
  } catch (error) {
    res.status(500).json({ message: 'Server Error' }); // Handle server errors
  }
};
