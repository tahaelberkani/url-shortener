import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortCode: {
    type: String,
    required: true,
  },
  newUrl: {
    type: String,
    required: true,
  },
});

export const Url = mongoose.model('Url', urlSchema);
