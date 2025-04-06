import React, { useState } from 'react';
import axios from 'axios';
import ResultCard from './components/ResultCard';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (file) => {
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    setResults(null); // 🔁 Auto-clear previous results
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
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

  const exportCSV = () => {
    if (!results?.results) return;
    const rows = [
      ['Source', 'Similarity %'],
      ...results.results.map(r => [r.source, r.similarity.toFixed(2)])
    ];
    const csv = rows.map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'traceback_results.csv');
  };

  const exportPDF = () => {
    if (!results?.results) return;
    const doc = new jsPDF();
    doc.text('TraceBack Image Match Results', 10, 10);
    results.results.forEach((r, i) => {
      doc.text(`${i + 1}. ${r.source} (${r.similarity.toFixed(2)}%)`, 10, 20 + i * 10);
    });
    doc.save('traceback_results.pdf');
  };

  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20 }}>
      <h1>🕵️‍♂️ TraceBack Reverse Image Finder</h1>

      {/* Dropzone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        style={{
          border: `2px dashed ${dragActive ? '#007bff' : '#aaa'}`,
          borderRadius: 10,
          padding: 30,
          textAlign: 'center',
          marginBottom: 20,
          backgroundColor: dragActive ? '#f0f8ff' : 'transparent',
          cursor: 'pointer'
        }}
        onClick={() => document.getElementById('fileInput').click()}
      >
        {preview ? (
          <img src={preview} alt="Preview" style={{ maxWidth: '100%', borderRadius: 8 }} />
        ) : (
          <p>📂 Drag & drop an image here or click to select</p>
        )}
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleChange}
        />
      </div>

      <button onClick={handleUpload} disabled={loading || !selectedFile}>
        {loading ? 'Analyzing...' : 'Search'}
      </button>

      {results && (
        <div style={{ marginTop: 30 }}>
          <h3>🧬 Image Hash:</h3>
          <code>{results.hash}</code>

          {results.ai_result && (
            <>
              <h3>🧠 AI Analysis:</h3>
              <pre>{JSON.stringify(results.ai_result, null, 2)}</pre>
            </>
          )}

          <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
            <button onClick={exportCSV}>📄 Export CSV</button>
            <button onClick={exportPDF}>🧾 Export PDF</button>
          </div>

          <h3 style={{ marginTop: 30 }}>🔍 Similar Images:</h3>
          {results.results.map((item, idx) => (
            <ResultCard key={idx} result={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
