const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../db/db');
const cors = require('cors');

cors({
  origin: 'https://emanning-app.xyz',
  methods: 'GET, POST, PUT, DELETE',
  credentials: true,
});
// router.use(cors());

router.post('/login', async (req, res) => {
  const { name, passcode } = req.body;
  // console.log('username:', name);
  // console.log('passcode', passcode);

  try {
    const result = await pool.query('SELECT * FROM login WHERE username = $1', [name]);

    if (result.rowCount === 0) {
      return res.status(400).json({ message: 'User not found' });
    }
    // console.log('rows length', result.rows.length);
    // console.log('result rows', result.rows);

    const user = result.rows[0];
    // console.log('user', user);

    if (passcode !== user.passhash) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }
    // console.log('user.passhash', user.passhash);

    const token = jwt.sign({ id: user.userId }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
    res.json({ userId: user.userId, name, token, flag: user.flag });
    // console.log('token', token);
    // console.log('userId', userId);
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
