"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import RelationshipHeatmap from "@/components/heatmap/heatmap";
import axios from "axios";

// Dynamically import GeographicalHeatmap with ssr disabled
const GeographicalHeatmap = dynamic(
  () => import("@/components/heatmap/geoheatmap"),
  { ssr: false } // This will only render the component on the client side
);

// type HeatmapPoint = [number, number, number]; // [lat, lng, intensity]

// var heatmapData: HeatmapPoint[] = [];

export default function HeatMap() {
  // useEffect(() => {
  //     const fetchHeatmapData = async () => {
  //       try {
  //         // console.log(BACKEND_URL);
  //         const response = await axios.get(
  //           `http://localhost:8000/api/get-country-coord`
  //         );
  //         const data: HeatmapPoint[] = response.data;
  //         heatmapData = data;
  //         console.log(heatmapData);
  //       } catch (error) {
  //         console.error("Error fetching heatmap data:", error);
  //       }
  //     };
  
  //     fetchHeatmapData();
  //   }, []);
  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <h1>Entity Relationship Dashboard</h1>
      {/* <RelationshipHeatmap /> */}
      <GeographicalHeatmap />
    </div>
  );
}
