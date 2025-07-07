const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();

// ✅ Use dynamic port for Render, fallback to 8000 locally
const PORT = process.env.PORT || 8000;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB connection
mongoose.connect("mongodb+srv://preethiusha007:hvvhoiyI9veeJSVN@cluster0.cadjnlq.mongodb.net/grocery?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Schema & Model
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: String
});

const User = mongoose.model('User', userSchema);

// ✅ Signup Route
app.post('/signup', async (req, res) => {
    const { name, email, password, role } = req.body;
    console.log("📥 Signup request received:", { name, email, role });

    try {
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        await newUser.save();
        console.log("✅ User saved:", newUser.email);

        res.json({ success: true, message: 'User created successfully' });
    } catch (err) {
        console.error("❌ Signup error:", err);
        res.status(500).json({ success: false, message: 'Signup failed' });
    }
});

// ✅ Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log("📥 Login attempt:", email);

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        res.json({
            success: true,
            message: 'Login successful',
            role: user.role // 🎯 Frontend uses this for role-based redirection
        });
    } catch (err) {
        console.error('❌ Login error:', err);
        res.status(500).json({ success: false, message: 'Login failed' });
    }
});

// ✅ Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
