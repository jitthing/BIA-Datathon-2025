// components/GeographicalHeatmap.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import axios from 'axios';

type HeatmapPoint = [number, number, number];

const HeatmapLayer: React.FC<{ data: HeatmapPoint[] }> = ({ data }) => {
  const map = useMap();

  useEffect(() => {
    const heatmap = (L as any).heatLayer(data, {
      radius: 25,
      blur: 15,
      maxZoom: 17,
    }).addTo(map);

    return () => {
      map.removeLayer(heatmap);
    };
  }, [map, data]);

  return null;
};

const GeographicalHeatmap: React.FC = () => {
  const [heatmapData, setHeatmapData] = useState<HeatmapPoint[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/get-country-coord'); // Adjust the endpoint as needed
        const data = response.data;
        setHeatmapData(data);
      } catch (error) {
        console.error('Error fetching heatmap data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <MapContainer
        center={[42.5728, 21.0358]} // Center on Pristina, Kosovo
        zoom={5}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {heatmapData.map((data, index) => (
          <Marker key={index} position={[data[0], data[1]]}>
            <Popup>some data here</Popup>
          </Marker>
        ))}
        <HeatmapLayer data={heatmapData} />
      </MapContainer>
    </div>
  );
};

export default GeographicalHeatmap;
