import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/query', { input });
      setOutput(response.data.response);
    } catch (error) {
      console.error('Error querying LLM:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Local LLM Interaction</h1>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your text here"
        />
        <button onClick={handleSubmit}>Submit</button>
        <div>
          <h2>Output:</h2>
          <p>{output}</p>
        </div>
      </header>
    </div>
  );
}

export default App;