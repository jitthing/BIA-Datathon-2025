"use client";

import React from "react";
import dynamic from "next/dynamic";
import RelationshipHeatmap from "@/components/heatmap/heatmap";

// Dynamically import GeographicalHeatmap with ssr disabled
const GeographicalHeatmap = dynamic(
  () => import("@/components/heatmap/geoheatmap"),
  { ssr: false } // This will only render the component on the client side
);

export default function HeatMap() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <h1>Entity Relationship Dashboard</h1>
      {/* <RelationshipHeatmap /> */}
      <GeographicalHeatmap />
    </div>
  );
}
