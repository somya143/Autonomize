require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
// mongodb+srv://<db_username>:<db_password>@cluster0.cb7b3hu.mongodb.net/
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.log("mongo_uri :", process.env.MONGO_URL)

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Routes
app.use('/api/users', userRoutes);

app.listen(process.env.PORT, () => console.log('Server running on http://localhost:5000'));