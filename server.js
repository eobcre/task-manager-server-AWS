const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');

const loginRoute = require('./routes/login');
const tasksRoute = require('./routes/tasks');

dotenv.config();

app.use(
  cors({
    origin: 'https://emanning-app.xyz',
    methods: 'GET, POST, PUT, DELETE',
    credentials: true,
  })
);
// app.use(cors());
app.use(express.json());
// routes
app.use('/api', loginRoute);
app.use('/api', tasksRoute);

// app.get('/', (req, res) => {
//   res.send('Test!');
// });

// mongo db
mongoose
  .connect(process.env.MONGO_DB_URI, { dbName: 'demo_db' })
  // .connect(process.env.DB_URI, { dbName: 'sample_mflix' })
  .then(() => {
    console.log('Connected to Mongo DB!');
  })
  .catch((err) => console.log(err));

app.use(express.static(path.join(__dirname, '../client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running in ${process.env.PORT}`);
});
