const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");

// App config
const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGO_URI =
  "mongodb+srv://preethiusha007:hvvhoiyI9veeJSVN@cluster0.cadjnlq.mongodb.net/grocery?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // Exit process if DB fails
  });

// ========== SCHEMAS & MODELS ==========

// User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
});
const User = mongoose.model("User", userSchema);

// BloodBank schema
const bloodBankSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  bloodAvailability: [
    {
      bloodGroup: { type: String, required: true },
      units: { type: Number, required: true },
    },
  ],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  email: { type: String }, // Optional field for traceability
});
const BloodBank = mongoose.model("BloodBank", bloodBankSchema);

// ========== ROUTES ==========

// SIGNUP
app.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    console.log("✅ User registered:", email);
    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (err) {
    console.error("❌ Signup error:", err.message);
    res.status(500).json({ success: false, message: "Signup failed" });
  }
});

// LOGIN
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      role: user.role,
      userId: user._id,
      email: user.email,
      name: user.name,
    });
  } catch (err) {
    console.error("❌ Login error:", err.message);
    res.status(500).json({ success: false, message: "Login failed" });
  }
});

// REGISTER BLOOD BANK
app.post("/register-bloodbank", async (req, res) => {
  const { name, location, bloodAvailability, userId, email } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const newBloodBank = new BloodBank({
      name,
      location,
      bloodAvailability,
      userId: user._id,
      email: user.email, // Traceable field
    });

    await newBloodBank.save();

    console.log("✅ Blood bank registered:", name);
    res.status(201).json({
      success: true,
      message: "Blood bank registered successfully",
    });
  } catch (err) {
    console.error("❌ Blood bank registration error:", err.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to register blood bank" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
