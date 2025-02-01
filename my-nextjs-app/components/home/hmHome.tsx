"use client";

import React from "react";
import dynamic from "next/dynamic";
import RelationshipHeatmap from "@/components/heatmap/heatmap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";  // Assuming you have a UI Input component
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

// Dynamically import GeographicalHeatmap with ssr disabled
const GeographicalHeatmap = dynamic(
  () => import("@/components/heatmap/geoheatmap"),
  { ssr: false } // This will only render the component on the client side
);

export default function HmHome() {

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <div className="w-full flex justify-between items-start">
          <CardTitle className="pb-3">HeatMap</CardTitle>
          <Link href="/heatmap" className="text-sm text-black hover:underline flex items-center">
            See More <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-5">
      <GeographicalHeatmap />
      </CardContent>
    </Card>
  );
}
