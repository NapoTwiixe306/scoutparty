const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Sequelize setup
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
});


// Define User model
const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => console.error('Error syncing database:', err));

app.get('/test', (req, res) => {
  res.status(200).send('Server is working!');
});

app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  console.log('Received signup request:', email);
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

app.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  console.log('Received signin request:', email);
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    res.status(200).json({ message: 'User signed in successfully' });
  } catch (error) {
    console.error('Error signing in user:', error);
    res.status(500).json({ error: 'Failed to sign in user' });
  }
});



// Route de déconnexion
app.post('/logout', (req, res) => {
    res.clearCookie('sessionID'); 
    res.status(200).json({ message: 'User logged out successfully' });
});
  


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
