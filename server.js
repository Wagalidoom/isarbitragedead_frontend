const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3069;

// Serve any static files built by React
app.use(express.static(path.join(__dirname, 'build')));

// Handle React routing, return all requests to the React app
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, '127.0.0.1', () => console.log(`App is listening on port ${port}`));

