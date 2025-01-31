"use client";

import React, { useEffect, useState, useRef } from "react";
import { Network } from "vis-network/standalone";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const API_URL = "http://localhost:8000/api/graph/relationships"; // ✅ Corrected API URL

export default function KnowledgeGraphChart() {
  const [graphData, setGraphData] = useState({ nodes: [], edges: [] });
  const networkRef = useRef(null);

  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        const response = await fetch(API_URL);
        const result = await response.json();

        if (result.success) {
          setGraphData({ nodes: result.nodes, edges: result.edges });
        } else {
          console.error("Error fetching graph data:", result.error);
        }
      } catch (error) {
        console.error("API fetch error:", error);
      }
    };

    fetchGraphData();
  }, []);

  useEffect(() => {
    if (graphData.nodes.length === 0) return;

    const container = networkRef.current;
    const data = { nodes: graphData.nodes, edges: graphData.edges };
    const options = {
      nodes: {
        shape: "dot",
        size: 20,
        font: { size: 14 },
      },
      edges: {
        arrows: "to",
        font: { align: "middle" },
        smooth: true,
      },
      physics: {
        enabled: true,
        stabilization: false,
      },
    };

    new Network(container, data, options);
  }, [graphData]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Knowledge Graph Visualization</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div ref={networkRef} className="w-full h-[500px]" />
      </CardContent>
    </Card>
  );
}

