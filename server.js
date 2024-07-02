const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
const path = require('path');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/login', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB!');
});

// Define the user schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Set up session middleware
app.use(session({ secret: 'your_secret_key', resave: true, saveUninitialized: true }));

app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login1.html'));
});

// Sign-up route
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.redirect('/'); // Redirect to login page after sign-up
    } catch (error) {
        console.error('Error in sign-up:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Login route
app.post('/login1', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && await bcrypt.compare(password, user.password)) {
            req.session.user = user;
            res.redirect('/home'); // Redirect to home page after successful login
        } else {
            res.send('Invalid email or password');
        }
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Home route
app.get('/home', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, 'home.html')); // Send the home.html file
    } else {
        res.redirect('/');
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
