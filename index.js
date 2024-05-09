// index.js

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Route to handle form submission
app.post('/send', async (req, res) => {
  const jsonData = req.body.json;
  const webhookUrl = req.body.webhook;

  try {
    // Send JSON data to webhook address
    const response = await axios.post(webhookUrl, jsonData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('Response from webhook:', response.data);
    res.send('JSON sent successfully to webhook!');
  } catch (error) {
    console.error('Error sending JSON to webhook:', error.message);
    res.status(500).send('Error sending JSON to webhook');
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
