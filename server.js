const express = require('express');
const app = express();

const history = [];

app.get('/', (req, res) => {
  res.send('Welcome to the Mathematical Operations Server! Try endpoints like /5/plus/3');
});

app.get('/history', (req, res) => {
  res.json(history);
});

app.get('/:num1/:operation/:num2', (req, res) => {
  const { num1, operation, num2 } = req.params;

  const parsedNum1 = parseFloat(num1);
  const parsedNum2 = parseFloat(num2);

  let result;
  switch (operation) {
    case 'plus':
      result = parsedNum1 + parsedNum2;
      break;
    case 'minus':
      result = parsedNum1 - parsedNum2;
      break;
    case 'into':
      result = parsedNum1 * parsedNum2;
      break;
    case 'dividedby':
      if (parsedNum2 !== 0) {
        result = parsedNum1 / parsedNum2;
      } else {
        res.status(400).json({ error: 'Cannot divide by zero.' });
        return;
      }
      break;
    default:
      res.status(400).json({ error: 'Unsupported operation.' });
      return;
  }

  const operationInfo = {
    question: `${parsedNum1} ${operation} ${parsedNum2}`,
    answer: result,
  };

  history.push(operationInfo);
  if (history.length > 20) {
    history.shift();
  }

  res.json(operationInfo);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
