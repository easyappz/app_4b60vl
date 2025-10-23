require('module-alias/register');

const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const apiRoutes = require('@src/routes/main');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api', apiRoutes);

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 4000;

if (!MONGO_URI) {
  console.warn('[Easyappz] MONGO_URI is not set in environment variables. API will start, but DB operations will fail.');
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('[Easyappz] MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`[Easyappz] API is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('[Easyappz] MongoDB connection error:', err && err.message ? err.message : err);
    if (process.env.NODE_ENV === 'development' && err && err.stack) {
      console.error(err.stack);
    }
    // Start server even if DB connection failed, to allow health checks
    app.listen(PORT, () => {
      console.log(`[Easyappz] API started on http://localhost:${PORT} (DB connection failed)`);
    });
  });
