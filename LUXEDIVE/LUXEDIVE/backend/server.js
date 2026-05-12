const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const documentRoutes = require('./routes/documents');
const userDataRoutes = require('./routes/userData');

const fleetRoutes = require('./routes/fleet');
const threeSixtyRoutes = require('./routes/threeSixty');
const validationRoutes = require('./routes/validation');
const bookingRoutes = require('./routes/bookings');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/user-data', userDataRoutes);
app.use('/api/cars', fleetRoutes);
app.use('/api/360', threeSixtyRoutes);
app.use('/api/validation', validationRoutes);
app.use('/api/bookings', bookingRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'OTP Server is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
