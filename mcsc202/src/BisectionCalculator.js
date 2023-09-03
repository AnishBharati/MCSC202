import React, { useState, useEffect } from 'react';
import './styles.css';
import math from 'mathjs'; // Import math library

function BisectionCalculator() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [tolerance, setTolerance] = useState('');
  const [expression, setExpression] = useState('');
  const [decimalPlaces, setDecimalPlaces] = useState(6); // Default to 6 decimal places
  const [result, setResult] = useState('');
  const [steps, setSteps] = useState([]);

  const calculateBisection = async () => {
    setSteps([]); // Clear previous steps
    setResult('');

    try {
      const response = await fetch('http://localhost:5000/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ a, b, tolerance, expression, decimalPlaces }),
      });

      if (response.ok) {
        const data = await response.json();
        const formattedRoot = parseFloat(data.root).toFixed(decimalPlaces);
        setResult(`Root: ${formattedRoot}, Iterations: ${data.iterations}`);
        setSteps(data.steps || []);
      } else {
        setResult('Invalid expression or an error occurred.');
      }
    } catch (error) {
      console.error('Error:', error);
      setResult('An error occurred while calculating.');
    }
  };

  const generatePlotData = () => {
    // You can implement graph generation using a simple charting library here.
    // Alternatively, you can use more advanced charting libraries like Chart.js or D3.js.
    // For simplicity, I'm skipping the graph generation code here.
  };

  return (
    <div className="calculator">
      <div className="input-box">
        <h1>Bisection Method Calculator</h1>
        <input type="text" placeholder="f(x)" value={expression} onChange={(e) => setExpression(e.target.value)} />
        <input type="number" placeholder="a" value={a} onChange={(e) => setA(e.target.value)} />
        <input type="number" placeholder="b" value={b} onChange={(e) => setB(e.target.value)} />
        <input type="number" placeholder="Tolerance" value={tolerance} onChange={(e) => setTolerance(e.target.value)} />
        <input type="number" placeholder="Decimal Places" value={decimalPlaces} onChange={(e) => setDecimalPlaces(e.target.value)} />
        <button onClick={calculateBisection}>Calculate</button>
        <p>{result}</p>
      </div>
      <div className="steps-box">
        <h2>Steps:</h2>
        {steps.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Iteration</th>
                <th>a</th>
                <th>b</th>
                <th>Root</th>
                <th>f(a)</th>
                <th>f(b)</th>
              </tr>
            </thead>
            <tbody>
              {steps.map((step, index) => (
                <tr key={index}>
                  <td>{step.iteration}</td>
                  <td>{step.a}</td>
                  <td>{step.b}</td>
                  <td>{step.root}</td>
                  <td>{step.fa}</td>
                  <td>{step.fb}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No steps to display.</p>
        )}
      </div>
    </div>
  );
}

export default BisectionCalculator;
