const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const PORT = 3000;

// Connect to MongoDB (local MongoDB Compass)
mongoose.connect('mongodb://127.0.0.1:27017/todoapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define Task model
const TaskSchema = new mongoose.Schema({ text: String });
const Task = mongoose.model('Task', TaskSchema);

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

// API ROUTES

// Get all tasks
app.get('/api/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Add task
app.post('/api/tasks', async (req, res) => {
  const task = new Task({ text: req.body.task });
  await task.save();
  res.sendStatus(200);
});

// Edit task
app.put('/api/tasks/:id', async (req, res) => {
  await Task.findByIdAndUpdate(req.params.id, { text: req.body.task });
  res.sendStatus(200);
});

// Delete task
app.delete('/api/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
