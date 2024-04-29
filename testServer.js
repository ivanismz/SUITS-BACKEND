const express = require('express');
const app = express();
const port = 3000;

// Import your task functions here
const { nextSubtask, previousSubtask, repeatSubtask } = require('./equipmentDiagnosisTasks');

app.get('/next', (req, res) => {
  const result = nextSubtask();
  res.send(result);
});

app.get('/previous', (req, res) => {
  const result = previousSubtask();
  res.send(result);
});

app.get('/repeat', (req, res) => {
  const result = repeatSubtask();
  res.send(result);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});