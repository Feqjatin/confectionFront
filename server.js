const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const mongoose = require('mongoose');
const path = require('path');

// Connect to MongoDB
mongoose.connect('mongodb+srv://bsshah1611:bhavya1611@cluster0.uxzzh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

// Define a User schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }
});
const User = mongoose.model('User', userSchema);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/assets'));

// Serve the main entry point
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Check username availability
app.post('/check-username', async (req, res) => {
    const { username } = req.body;
    const user = await User.findOne({ username });
    if (user) {
        return res.json({ available: false });
    }
    return res.json({ available: true });
});

// Other routes...

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});