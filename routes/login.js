const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const supabase = require('../db/db');
const cors = require('cors');
require('dotenv').config();

cors({
  origin: 'https://emanning-app.xyz',
  methods: 'GET, POST, PUT, DELETE',
  credentials: true,
});
// router.use(cors());

router.post('/login', async (req, res) => {
  const { name, passcode } = req.body;

  try {
    const { data, error } = await supabase.from('users').select('*').eq('username', name);
    
    if (error || data.length === 0) {
      return res.status(400).json({ message: 'User not found.' });
    }

    const user = data[0];

    if (passcode !== data[0].passhash) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: user.userId }, process.env.TOKEN_SECRET, { expiresIn: '1h' });

    res.json({ userId: user.userId, name, token, flag: user.flag });
  } catch (error) {
    console.error('Error login:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

router.post('/logout', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (token) {
    res.json({ message: 'Logged out!!!' });
  } else {
    res.status(400).json({ message: 'No token provided.' });
  }
});

module.exports = router;
