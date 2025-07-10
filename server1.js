// server1.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// === Middleware ===
app.use(cors());
app.use(express.json());

// === MongoDB Connection ===
const MONGO_URI = 'mongodb+srv://preethiusha007:hvvhoiyI9veeJSVN@cluster0.cadjnlq.mongodb.net/grocery?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB connected');
});
mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err.message);
});

// === Schema & Model ===
const requestSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: String, required: true },
  bloodGroup: { type: String, required: true },

  attendeeName: { type: String, required: true },
  attendeeMobile: { type: String, required: true },

  bloodType: { type: String, required: true },
  quantity: { type: String, required: true },
  requiredDate: { type: String, required: true },

  city: { type: String, required: true },
  donationLocation: { type: String, required: true },

  requisitionFile: { type: String, default: '' }, // Optional
}, { timestamps: true });

const BloodRequest = mongoose.models.BloodRequest || mongoose.model('BloodRequest', requestSchema);

// === Routes ===
app.get('/', (req, res) => {
  res.send('🩸 Blood Request API is running!');
});

app.post('/api/request-blood', async (req, res) => {
  try {
    const {
      patientName, gender, dob, bloodGroup,
      attendeeName, attendeeMobile,
      bloodType, quantity, requiredDate,
      city, donationLocation, requisitionFile
    } = req.body;

    console.log('📥 Incoming form data:', req.body);

    // Validate required fields
    if (
      !patientName || !gender || !dob || !bloodGroup ||
      !attendeeName || !attendeeMobile ||
      !bloodType || !quantity || !requiredDate ||
      !city || !donationLocation
    ) {
      return res.status(400).json({ message: '⚠️ All required fields must be filled.' });
    }

    // Save to DB
    const savedRequest = await BloodRequest.create({
      patientName,
      gender,
      dob,
      bloodGroup,
      attendeeName,
      attendeeMobile,
      bloodType,
      quantity,
      requiredDate,
      city,
      donationLocation,
      requisitionFile: requisitionFile || '',
    });

    console.log('✅ Saved to DB:', savedRequest);

   res.status(201).json({ message: '✅ Blood request submitted successfully!', data: savedRequest });
 2  } catch (error) {
    console.error('❌ Error submitting form:', error.message);
    res.status(500).json({ message: '❌ Failed to save request.', error: error.message });
  }
});

// === Start Server ===
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
