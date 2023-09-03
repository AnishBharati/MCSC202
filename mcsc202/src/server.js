const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const math = require('mathjs');

const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/calculate', (req, res) => {
  const { a, b, tolerance, expression } = req.body;

  try {
    const f = math.compile(expression);
    const calculateBisection = (a, b, tolerance) => {
      let iteration = 0;
      let root;

      while (Math.abs(b - a) >= tolerance) {
        root = (a + b) / 2;
        if (f.evaluate({ x: root }) === 0) {
          break;
        } else if (f.evaluate({ x: root }) * f.evaluate({ x: a }) < 0) {
          b = root;
        } else {
          a = root;
        }
        iteration++;
      }

      return { root: root.toFixed(6), iterations: iteration };
    };

    const result = calculateBisection(parseFloat(a), parseFloat(b), parseFloat(tolerance));
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: 'Invalid expression' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
