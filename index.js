const express = require('express');
const bodyParser = require('body-parser');
const todosRoutes = require('./routes/todos');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/api/todos', todosRoutes);
app.get('/', (req, res) => {
  res.send('Welcome to the Todo List API!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
