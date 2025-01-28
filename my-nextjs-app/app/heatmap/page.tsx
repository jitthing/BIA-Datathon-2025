// pages/index.tsx
import React from 'react';
import RelationshipHeatmap from '@/components/heatmap/heatmap';

const Home: React.FC = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <h1>Entity Relationship Dashboard</h1>
      <RelationshipHeatmap />
    </div>
  );
};

export default Home;