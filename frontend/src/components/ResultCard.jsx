import React from 'react';

const ResultCard = ({ result }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: 10, marginTop: 10, borderRadius: 8 }}>
      <p><strong>Source:</strong> <a href={result.source} target="_blank" rel="noreferrer">{result.source}</a></p>
      <p><strong>Similarity:</strong> {Math.round(result.similarity)}%</p>
    </div>
  );
};

export default ResultCard;
