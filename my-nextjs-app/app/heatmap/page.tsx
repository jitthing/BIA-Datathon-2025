// pages/index.tsx
import React from 'react';
// import dynamic from 'next/dynamic';
import RelationshipHeatmap from '@/components/heatmap/heatmap';
import GeographicalHeatmap from '@/components/heatmap/geoheatmap';

// const RelationshipHeatmap = dynamic(() => import('@/components/heatmap/heatmap'), { ssr: false });
// const GeographicalHeatmap = dynamic(() => import('@/components/heatmap/geoheatmap'), { ssr: false });


const Home: React.FC = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <h1>Entity Relationship Dashboard</h1>
      <RelationshipHeatmap />
      <GeographicalHeatmap />
    </div>
  );
};

export default Home;