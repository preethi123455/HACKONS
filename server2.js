const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// App setup
const app = express();
const PORT = 5000;

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// MongoDB Atlas Connection
const MONGO_URI = 'mongodb+srv://preethiusha007:hvvhoiyI9veeJSVN@cluster0.cadjnlq.mongodb.net/donorsDB?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Mongoose Schema & Model
const donorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  aadhar: { type: String, required: true }, // file name only
  bloodType: { type: String, required: true },
  phone: { type: String, required: true },
}, {
  timestamps: true
});

const Donor = mongoose.model('Donor', donorSchema);

// Routes
app.get('/', (req, res) => {
  res.send('🚑 Blood Bank Donor API is running...');
});

// POST - Save Donor Info
app.post('/api/donors', async (req, res) => {
  try {
    const { name, location, aadhar, bloodType, phone } = req.body;

    if (!name || !location || !aadhar || !bloodType || !phone) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newDonor = new Donor({ name, location, aadhar, bloodType, phone });
    await newDonor.save();

    res.status(201).json({ message: '✅ Donor registered successfully' });
  } catch (error) {
    console.error('❌ Error saving donor:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
