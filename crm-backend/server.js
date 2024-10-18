// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const mainRouter = require('./router/mainRouter');

const app = express();
const PORT = process.env.PORT || 3333;

// Middleware
app.use(cors());
app.use(express.json());

// Routing
app.use('/api', mainRouter);

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Serwer uruchomiony na porcie ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Błąd połączenia z bazą danych:', error);
  });
