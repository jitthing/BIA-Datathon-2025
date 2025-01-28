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
[41.3275, 19.8189, 1], // Tirana, Albania
[40.6401, 22.9444, 1], // Thessaloniki, Greece
[42.6977, 23.3219, 1], // Sofia, Bulgaria
[45.8150, 15.9819, 1], // Zagreb, Croatia
[47.4979, 19.0402, 1], // Budapest, Hungary
[44.7866, 20.4489, 1], // Belgrade, Serbia
[41.9981, 21.4254, 1], // Skopje, North Macedonia
[43.8563, 18.4131, 1], // Sarajevo, Bosnia and Herzegovina
[42.4412, 19.2636, 1], // Podgorica, Montenegro
[39.9334, 32.8597, 1], // Ankara, Turkey
[34.0522, -118.2437, 1], // Los Angeles, USA
[40.7128, -74.0060, 1], // New York, USA
[51.5074, -0.1278, 1], // London, UK
[35.6895, 139.6917, 1], // Tokyo, Japan
[48.8566, 2.3522, 1], // Paris, France
[55.7558, 37.6173, 1], // Moscow, Russia
[39.9042, 116.4074, 1], // Beijing, China
[19.4326, -99.1332, 1], // Mexico City, Mexico
[28.6139, 77.2090, 1], // New Delhi, India
[33.8688, 151.2093, 1], // Sydney, Australia
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
        zoom={5}
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