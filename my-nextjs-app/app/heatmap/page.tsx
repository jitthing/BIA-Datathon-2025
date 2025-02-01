"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import axios from "axios";

// Dynamically import GeographicalHeatmap with ssr disabled
const GeographicalHeatmap = dynamic(
  () => import("@/components/heatmap/geoheatmap"),
  { ssr: false } // This will only render the component on the client side
);

// type HeatmapPoint = [number, number, number]; // [lat, lng, intensity]

// var heatmapData: HeatmapPoint[] = [];

export default function HeatMap() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <h1>Entity Relationship Dashboard</h1>
      {/* <RelationshipHeatmap /> */}
      <GeographicalHeatmap />
    </div>
  );
}
