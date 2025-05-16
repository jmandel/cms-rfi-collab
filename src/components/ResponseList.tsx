import React from 'react';
import { RfiPoint } from '../types';
import ResponseCard from './ResponseCard'; // Imported

interface ResponseListProps {
  rfiPoints: RfiPoint[];
}

const ResponseList: React.FC<ResponseListProps> = ({ rfiPoints }) => {
  if (rfiPoints.length === 0) {
    return <p className="no-responses-message" style={{ marginTop: '20px', fontStyle: 'italic' }}>No responses match the current filters.</p>;
  }

  // const MockResponseCard: React.FC<{point: RfiPoint}> = ({ point }) => ( ... ); // Removed

  return (
    <div className="response-list">
      <p>
        Showing {rfiPoints.length} response{rfiPoints.length === 1 ? '' : 's'}
      </p>
      {rfiPoints.map(point => (
        <ResponseCard key={point.id} point={point} /> // Used actual component
        // <MockResponseCard key={point.id} point={point} />
      ))}
    </div>
  );
};

export default ResponseList; 