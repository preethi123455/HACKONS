// server1.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt'); // for password comparison

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas Connection
const MONGO_URI = "mongodb+srv://preethiusha007:hvvhoiyI9veeJSVN@cluster0.cadjnlq.mongodb.net/bloodbankApp?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => {
  console.error("❌ MongoDB connection failed:", err.message);
  process.exit(1);
});

// ========== SCHEMAS ==========

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' } // Donor(Individual), Donor(BloodBank), Receiver
});

const User = mongoose.model('User', userSchema);

// BloodBank Schema
const bloodBankSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bloodAvailability: [{
    bloodGroup: String,
    units: Number
  }]
});

const BloodBank = mongoose.model('BloodBank', bloodBankSchema);

// ========== ROUTES ==========

// 🟢 LOGIN Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "❌ User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "❌ Invalid password." });
    }

    res.status(200).json({
      success: true,
      userId: user._id,
      role: user.role,
      message: "✅ Login successful."
    });

  } catch (err) {
    console.error("❌ Login error:", err.message);
    res.status(500).json({ success: false, message: "Server error during login." });
  }
});

// 🟢 Register Blood Bank (Email Lookup)
app.post('/register-bloodbank', async (req, res) => {
  const { name, location, email, bloodAvailability } = req.body;

  try {
    // Lookup user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "❌ User with this email not found." });
    }

    const newBank = new BloodBank({
      name,
      location,
      userId: user._id,
      bloodAvailability
    });

    await newBank.save();

    res.status(201).json({
      success: true,
      message: "✅ Blood bank registered successfully.",
      bloodBank: newBank
    });

  } catch (err) {
    console.error("❌ Error saving blood bank:", err.message);
    res.status(500).json({ success: false, message: "Failed to register blood bank." });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
