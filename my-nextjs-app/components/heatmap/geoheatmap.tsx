// components/GeographicalHeatmap.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import axios from 'axios';

type HeatmapPoint = [number, number, number, string];

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

console.log(BACKEND_URL);

const HeatmapLayer: React.FC<{ data: HeatmapPoint[] }> = ({ data }) => {
  const map = useMap();

  useEffect(() => {
    const heatmapData = data.map(point => [point[0], point[1], point[2]]); // Extract only the numbers for the heatmap
    const heatmap = (L as any).heatLayer(heatmapData, {
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
  const [pointData, setpointData] = useState<HeatmapPoint[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get( BACKEND_URL + '/api/get-country-coord'); // Adjust the endpoint as needed
        const data = response.data;
        setpointData(data);
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
        {pointData.map((data, index) => (
          <Marker key={index} position={[data[0], data[1]]}>
            <Popup>{data[3]}</Popup>
          </Marker>
        ))}
        <HeatmapLayer data={pointData} />
      </MapContainer>
    </div>
  );
};

export default GeographicalHeatmap;
