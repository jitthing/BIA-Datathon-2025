"use client";

import React, { useEffect, useState, useRef } from "react";
import { Network } from "vis-network/standalone";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";  // Assuming you have a UI Input component
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const BASE_API_URL = "http://localhost:8000/api/graph/relationships";

export default function KgHome() {
  const [graphData, setGraphData] = useState({ nodes: [], edges: [] });
  const [searchQuery, setSearchQuery] = useState("");
  const networkRef = useRef(null);

  const fetchGraphData = async (search = "") => {
    try {
      const response = await fetch(`${BASE_API_URL}?search=${encodeURIComponent(search)}&limit=50`);
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

  // Fetch initial data when the component loads
  useEffect(() => {
    fetchGraphData('singapore');
  }, []);



  // Update graph when data changes
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
    <Card className="h-full max-h-full flex flex-col overflow-hidden">
      <CardHeader className="items-center pb-0">
        <div className="w-full flex justify-between items-start">
          <CardTitle className="pb-3">Knowledge Graph Visualization</CardTitle>
          <Link href="/knowledgegraph" className="text-sm text-black hover:underline flex items-center">
              See More <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        {/* Search Bar */}
        <div className="flex gap-2 mt-2 pb-4">
          <Input
            type="text"
            placeholder="Search nodes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button onClick={() => fetchGraphData(searchQuery)}>Search</Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pb-0 overflow-hidden">
        <div ref={networkRef} className="w-full h-full" />
      </CardContent>
    </Card>
  );
}
