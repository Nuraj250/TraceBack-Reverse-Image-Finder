import React, { useState } from 'react';
import axios from 'axios';
import ResultCard from './components/ResultCard';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResults(response.data);
    } catch (err) {
      console.error('Upload error:', err);
      alert('Error uploading image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: 'auto', padding: 20 }}>
      <h1>🕵️‍♂️ TraceBack Reverse Image Finder</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && (
        <div style={{ marginTop: 10 }}>
          <img src={preview} alt="preview" style={{ maxWidth: '100%' }} />
        </div>
      )}
      <button onClick={handleUpload} style={{ marginTop: 10 }} disabled={loading}>
        {loading ? 'Analyzing...' : 'Search'}
      </button>

      {results && (
        <div style={{ marginTop: 20 }}>
          <h3>Image Hash:</h3>
          <code>{results.hash}</code>

          {results.ai_result && (
            <div style={{ marginTop: 20 }}>
              <h3>AI Analysis:</h3>
              <pre>{JSON.stringify(results.ai_result, null, 2)}</pre>
            </div>
          )}

          <h3>Similar Images:</h3>
          {results.results.map((item, idx) => (
            <ResultCard key={idx} result={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
