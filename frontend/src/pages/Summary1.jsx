import React, { useState } from 'react';
import axios from 'axios';
import './Summary1.css'; // Import the CSS file

const Summary1 = () => {
  const [sid, setSid] = useState('');
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState('');

  const handleFetch = async () => {
    try {
      setError('');
      setSummary(null);
      const response = await axios.get(`/api/summary/${sid}`);
      setSummary(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch summary data');
    }
  };

  return (
    <div className="container">
      <h1 className="title">System Summary</h1>
      <input
        type="text"
        value={sid}
        onChange={(e) => setSid(e.target.value)}
        placeholder="Enter System ID"
        className="input"
      />
      <button onClick={handleFetch} className="button">
        Fetch Summary
      </button>

      {error && <p className="error">{error}</p>}

      {summary && (
        <div className="summary">
          <pre>{JSON.stringify(summary, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Summary1;
