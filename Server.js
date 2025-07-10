const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

const MONGO_URI = "mongodb+srv://preethiusha007:hvvhoiyI9veeJSVN@cluster0.cadjnlq.mongodb.net/grocery?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "user" },
});

const User = mongoose.model("User", userSchema);

const bloodBankSchema = new mongoose.Schema({
  name: String,
  location: String,
  bloodAvailability: [
    {
      bloodGroup: String,
      units: Number,
    },
  ],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  email: String,
});

const BloodBank = mongoose.model("BloodBank", bloodBankSchema);

// Signup Route
app.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ success: false, message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await new User({ name, email, password: hashed, role }).save();

    if (role === "Donor(BloodBank)") {
      const [branchName, branchArea] = name.split(" - ");
      await new BloodBank({
        name: branchName || name,
        location: branchArea || "Unknown",
        bloodAvailability: [],
        userId: user._id,
        email,
      }).save();
    }

    res.status(201).json({ success: true, message: "User created successfully" });
  } catch (err) {
    console.error("Signup error:", err.message);
    res.status(500).json({ success: false, message: "Signup failed" });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ success: false, message: "Invalid credentials" });

    res.status(200).json({
      success: true,
      message: "Login successful",
      role: user.role,
      userId: user._id,
      email: user.email,
      name: user.name,
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ success: false, message: "Login failed" });
  }
});

// Register/Update Blood Bank Route
app.post("/register-bloodbank", async (req, res) => {
  const { name, bloodAvailability, userId, email } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const existing = await BloodBank.findOne({ userId });

    if (existing) {
      existing.bloodAvailability = bloodAvailability;
      await existing.save();
      return res.status(200).json({ success: true, message: "Blood bank data updated" });
    }

    const newBank = new BloodBank({ name, location: "Unknown", bloodAvailability, userId, email });
    await newBank.save();
    res.status(201).json({ success: true, message: "Blood bank registered" });
  } catch (err) {
    console.error("Register blood bank error:", err.message);
    res.status(500).json({ success: false, message: "Blood bank registration failed" });
  }
});

app.get("/fetch-bloodbank", async (req, res) => {
  const { userId } = req.query;

  try {
    const bank = await BloodBank.findOne({ userId });
    if (!bank) return res.json({ success: true, bloodAvailability: [] });
    res.json({ success: true, bloodAvailability: bank.bloodAvailability });
  } catch (err) {
    console.error("Fetch error:", err.message);
    res.status(500).json({ success: false });
  }
});
app.get("/fetch-all-bloodbanks", async (req, res) => {
  try {
    const banks = await BloodBank.find({});
    res.json({ success: true, bloodBanks: banks });
  } catch (err) {
    console.error("Fetch all banks error:", err.message);
    res.status(500).json({ success: false });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
