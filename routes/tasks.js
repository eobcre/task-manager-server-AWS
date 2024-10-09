const express = require('express');
const router = express.Router();
const AssignTask = require('../models/assignTask');
const supabase = require('../db/db');
const cors = require('cors');

cors({
  origin: 'https://emanning-app.xyz',
  methods: 'GET, POST, PUT, DELETE',
  credentials: true,
});
// router.use(cors());

router.post('/assignTasks', async (req, res) => {
  const {
    userId,
    userName,
    taskName,
    documentType,
    assignTo,
    description,
    flag,
  } = req.body;

  const newTask = new AssignTask({
    userId,
    userName,
    taskName,
    documentType,
    assignTo,
    description,
    flag,
  });

  try {
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/retrieveTasks', async (req, res) => {
  const { userId } = req.body;
  // console.log('userId', userId);

  try {
    const tasks = await AssignTask.find({ 'assignTo.userId': userId });
    // console.log('tasks', tasks)

    // if (tasks.length === 0) {
    //   return res.status(404).json({ message: 'No tasks found.' });
    // }

    res.json(tasks);
  } catch (error) {
    console.log('Error retrieving tasks:', error.message);
    res.status(500).json({ message: error.message });
  }
});

router.post('/retrieveAssignedTasks', async (req, res) => {
  const { userId } = req.body;

  try {
    const assignedTasks = await AssignTask.find({ userId });

    if (assignedTasks.length === 0) {
      return res.status(404).json({ message: 'No assigned tasks found.' });
    }

    res.json(assignedTasks);
  } catch (error) {
    console.log('Error retrieving assigned tasks:', error.message);
    res.status(505).json({ message: error.message });
  }
});

router.post('/retrieveMembers', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('flag', true);

    if (error) {
      console.error('Error retrieving members:', error);
      return res
        .status(500)
        .json({ message: 'Error retrieving members', error });
    }
    res.json(data);
  } catch (error) {
    console.error('Error retrieving members:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
