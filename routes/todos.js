const express = require('express');
const router = express.Router();
const fs = require('fs');

const FILE_PATH = './todos.json';
const COUNTER_PATH = './counter.json';

// Helper function to read todos from file
const readTodosFromFile = () => {
  if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, JSON.stringify([]));
  }

  const data = fs.readFileSync(FILE_PATH, 'utf8');

  try {
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Helper function to write todos to file
const writeTodosToFile = (todos) => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(todos, null, 2));
};

// Helper function to read the counter from file
const readCounterFromFile = () => {
  if (!fs.existsSync(COUNTER_PATH)) {
    fs.writeFileSync(COUNTER_PATH, JSON.stringify({ lastId: 0 }));
  }

  const data = fs.readFileSync(COUNTER_PATH, 'utf8');

  try {
    return JSON.parse(data).lastId;
  } catch (error) {
    return 0;
  }
};

// Helper function to write the counter to file
const writeCounterToFile = (counter) => {
  fs.writeFileSync(COUNTER_PATH, JSON.stringify({ lastId: counter }));
};

// Fetch Todos with search and filter
router.get('/', (req, res) => {
  let todos = readTodosFromFile();
  
  const { search, sortBy, status } = req.query;

  if (search) {
    todos = todos.filter(todo => 
      todo.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (status) {
    const isCompleted = status.toLowerCase() === 'done';
    todos = todos.filter(todo => todo.completed === isCompleted);
  }

  if (sortBy === 'latest') {
    todos = todos.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  }

  res.json(todos);
});

// Add Todo
router.post('/', (req, res) => {
  const todos = readTodosFromFile();
  let counter = readCounterFromFile();
  counter += 1;
  const newId = counter.toString().padStart(5, '0'); // Ensure 5-digit ID
  const newTodo = { id: newId, ...req.body, completed: false, updatedAt: new Date() };
  todos.push(newTodo);
  writeTodosToFile(todos);
  writeCounterToFile(counter);
  res.status(201).json(newTodo);
});

// Update Todo
router.put('/:id', (req, res) => {
  const todos = readTodosFromFile();
  const index = todos.findIndex(todo => todo.id === req.params.id);
  if (index !== -1) {
    todos[index] = { ...todos[index], ...req.body, updatedAt: new Date() };
    writeTodosToFile(todos);
    res.json(todos[index]);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

// Delete Todo
router.delete('/:id', (req, res) => {
  let todos = readTodosFromFile();
  todos = todos.filter(todo => todo.id !== req.params.id);
  writeTodosToFile(todos);
  res.status(204).json({ message: 'Todo deleted successfully' });
});

// Mark as Done
router.patch('/:id/done', (req, res) => {
  const todos = readTodosFromFile();
  const index = todos.findIndex(todo => todo.id === req.params.id);
  if (index !== -1) {
    todos[index].completed = true;
    todos[index].updatedAt = new Date();
    writeTodosToFile(todos);
    res.json(todos[index]);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

module.exports = router;
