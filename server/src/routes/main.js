const express = require('express');

const authController = require('@src/controllers/authController');
const listingsController = require('@src/controllers/listingsController');
const categoriesController = require('@src/controllers/categoriesController');
const usersController = require('@src/controllers/usersController');
const authMiddleware = require('@src/middlewares/authMiddleware');

const router = express.Router();

const includeStack = process.env.NODE_ENV === 'development';

function wrap(handler) {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (error) {
      console.error('[Easyappz] Route error:', error && error.message ? error.message : error);
      const status = error && error.status ? error.status : 500;
      const payload = { message: error && error.message ? error.message : 'Internal server error' };
      if (includeStack && error && error.stack) payload.stack = error.stack;
      res.status(status).json(payload);
    }
  };
}

// Service endpoints
router.get('/hello', (req, res) => {
  try {
    res.json({ message: 'Hello from Easyappz API!' });
  } catch (error) {
    res.status(500).json({ message: error.message, stack: includeStack ? error.stack : undefined });
  }
});

router.get('/status', (req, res) => {
  try {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  } catch (error) {
    res.status(500).json({ message: error.message, stack: includeStack ? error.stack : undefined });
  }
});

// Categories
router.get('/categories', wrap(categoriesController.getCategories));

// Auth
router.post('/auth/register', wrap(authController.register));
router.post('/auth/login', wrap(authController.login));
router.get('/auth/me', authMiddleware, wrap(authController.me));

// Users
router.get('/users/me', authMiddleware, wrap(usersController.getMe));
router.patch('/users/me', authMiddleware, wrap(usersController.updateMe));

// Listings (public and protected)
router.get('/listings', wrap(listingsController.getListings));
router.get('/listings/:id', wrap(listingsController.getListingById));
router.get('/me/listings', authMiddleware, wrap(listingsController.getMyListings));
router.post('/listings', authMiddleware, wrap(listingsController.createListing));
router.patch('/listings/:id', authMiddleware, wrap(listingsController.updateListing));
router.delete('/listings/:id', authMiddleware, wrap(listingsController.deleteListing));

module.exports = router;
