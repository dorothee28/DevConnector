const express = require('express');
const connectBD = require('./config/db');

const app = express();

// Connect Database
connectBD();

app.get('/', (req, res) => res.send('API Running!'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));