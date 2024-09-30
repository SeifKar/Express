const express = require('express');
const app = express();
const port = 3000;

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Serve static files (like CSS)
app.use(express.static('public'));

// Custom middleware to check working hours (Monday to Friday, 9 AM to 5 PM)
const workingHoursMiddleware = (req, res, next) => {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const currentDay = currentDate.getDay();

  // Check if the request is within working hours (Monday to Friday, 9-17)
  if (currentDay >= 1 && currentDay <= 5 && currentHour >= 9 && currentHour < 17) {
    next(); // Proceed to the next middleware/route
  } else {
    res.send('The web application is only available during working hours (Monday to Friday, 9 AM to 5 PM).');
  }
};

// Apply the middleware
app.use(workingHoursMiddleware);

// Routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/services', (req, res) => {
  res.render('services');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
