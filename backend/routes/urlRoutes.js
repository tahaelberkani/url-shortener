import express from 'express';
import {
  checkHealth,
  createShortUrl,
  redirectShortUrl,
} from '../controllers/urlController.js';

const router = express.Router();

router.get('/', checkHealth);
router.post('/shorten', createShortUrl);
router.get('/:shortCode', redirectShortUrl);

export default router;
