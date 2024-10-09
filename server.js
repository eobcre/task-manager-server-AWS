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
const uri = `mongodb+srv://eobcre:${process.env.MONGO_PW}@cluster-0.h8ehx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-0`
mongoose
  .connect(uri, { dbName: 'demo_db' })
  // .connect(process.env.DB_URI, { dbName: 'sample_mflix' })
  .then(() => {
    console.log('Connected to Mongo DB!');
  })
  .catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
  console.log(`Server is running in ${process.env.PORT}`);
});
