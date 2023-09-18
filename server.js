const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Define your MongoDB schema and model here
// For this example, we'll use an array to store contacts
let contacts = [];

// API endpoints
app.get('/api/contacts', (req, res) => {
  res.json(contacts);
});

app.post('/api/contacts', (req, res) => {
  const newContact = req.body;
  contacts.push(newContact);
  res.json(newContact);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
