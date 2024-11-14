const express = require('express');
const path = require('path');
const app = express();

// Serve static files from public directory
app.use(express.static('public'));

// Working hours middleware
const checkWorkingHours = (req, res, next) => {
    const date = new Date();
    const day = date.getDay(); // 0 is Sunday, 1-5 is Monday-Friday, 6 is Saturday
    const hour = date.getHours();

    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        next(); // During working hours
    } else {
        res.status(403).sendFile(path.join(__dirname, 'public', 'closed.html'));
    }
};

// Apply working hours middleware to all routes
app.use(checkWorkingHours);

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'services.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
