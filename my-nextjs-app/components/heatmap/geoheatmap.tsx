// components/GeographicalHeatmap.tsx
"use client";

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';

// Define the type for geographical data points
type HeatmapPoint = [number, number, number]; // [lat, lng, intensity]

// Mock geographical data 
// will have to generate a data structure of position + intensity based on number of times mentioned, utilise google maps api?
const heatmapData: HeatmapPoint[] = [
  [42.5728, 21.0358, 1], // Pristina, Kosovo
  [46.0569, 14.5058, 1], // Ljubljana, Slovenia
  // Add more points as needed
];

// Component to add the heatmap layer to the map
const HeatmapLayer: React.FC<{ data: HeatmapPoint[] }> = ({ data }) => {
  const map = useMap();

  useEffect(() => {
    // Add the heatmap layer
    const heatmap = (L as any).heatLayer(data, {
      radius: 25, // Adjust the radius of the heatmap points
      blur: 15,   // Adjust the blur effect
      maxZoom: 17,
    }).addTo(map);

    // Cleanup on unmount
    return () => {
      map.removeLayer(heatmap);
    };
  }, [map, data]);

  return null;
};

const GeographicalHeatmap: React.FC = () => {
  return (
    <div style={{ height: '500px', width: '100%' }}>
      <MapContainer
        center={[42.5728, 21.0358]} // Center on Pristina, Kosovo
        zoom={7}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <HeatmapLayer data={heatmapData} />
      </MapContainer>
    </div>
  );
};

export default GeographicalHeatmap;