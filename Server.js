const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

const MONGO_URI = "mongodb+srv://preethiusha007:hvvhoiyI9veeJSVN@cluster0.cadjnlq.mongodb.net/grocery?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGO_URI, {
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

// ✅ Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "obupreethig.23cse@kongu.edu",      // ✅ Replace with your email
    pass: "yapl lbak jons ihtg",              // ✅ Replace with your Gmail App Password
  },
});

// Routes

// Signup
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

// Login
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

// Register Blood Bank
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

// Fetch blood bank
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

// Fetch all blood banks
app.get("/fetch-all-bloodbanks", async (req, res) => {
  try {
    const banks = await BloodBank.find({});
    res.json({ success: true, bloodBanks: banks });
  } catch (err) {
    console.error("Fetch all banks error:", err.message);
    res.status(500).json({ success: false });
  }
});

// 🚨 Emergency Request
app.post("/api/emergency-request", async (req, res) => {
  const {
    recipientName,
    bloodGroup,
    units,
    hospitalAddress,
    mobileNumber,
    place,
  } = req.body;

  if (!recipientName || !bloodGroup || !units || !hospitalAddress || !mobileNumber || !place) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const matchingBanks = await BloodBank.find({
      location: new RegExp(place, "i")
    });

    if (matchingBanks.length === 0) {
      return res.status(404).json({ message: "No blood banks found in this location" });
    }

    let sentTo = [];

    for (const bank of matchingBanks) {
      if (!bank.email || bank.email.trim() === "") {
        console.warn(`⚠️ Skipping bank "${bank.name}" — missing email`);
        continue;
      }

      const mailOptions = {
        from: "obupreethig.23cse@kongu.edu",
        to: bank.email,
        subject: "⛑️ Emergency Blood Request",
        text: `
An emergency blood request has been made:

Recipient Name: ${recipientName}
Blood Group: ${bloodGroup}
Units Needed: ${units}
Hospital Address: ${hospitalAddress}
Contact Number: ${mobileNumber}
Place: ${place}

Please respond immediately if you can help.
        `
      };

      try {
        await transporter.sendMail(mailOptions);
        sentTo.push({ name: bank.name, email: bank.email });
      } catch (emailError) {
        console.error(`❌ Email to ${bank.email} failed:`, emailError.message);
      }
    }

    res.status(200).json({
      message: `Emergency request sent to ${sentTo.length} blood bank(s) in ${place}.`,
      sentTo
    });

  } catch (err) {
    console.error("Emergency request error:", err.message);
    res.status(500).json({ message: "Server error while processing emergency request" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
