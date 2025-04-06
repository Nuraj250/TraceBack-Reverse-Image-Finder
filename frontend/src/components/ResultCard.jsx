import React from 'react';

const ResultCard = ({ result }) => {
  const percentage = Math.round(result.similarity);

  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: 8,
      padding: 10,
      marginTop: 10,
    }}>
      <img src={result.source} alt="Match" style={{ width: '100%', borderRadius: 4 }} />
      <p><strong>Similarity:</strong> {percentage}%</p>

      <div style={{
        background: '#eee',
        borderRadius: 4,
        height: 10,
        marginTop: 5,
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${percentage}%`,
          background: percentage > 70 ? 'green' : percentage > 40 ? 'orange' : 'red',
          height: '100%'
        }} />
      </div>

      <a href={result.source} target="_blank" rel="noreferrer" style={{ display: 'block', marginTop: 8 }}>
        View Source
      </a>
    </div>
  );
};

export default ResultCard;
