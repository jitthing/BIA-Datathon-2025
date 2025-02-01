"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";  // Assuming you have a UI Input component
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Timeline, TimelineItem } from "@/components/timeline";

import { useEffect, useState } from "react";
import axios from "axios";

export default function TlHome() {
  const [query, setQuery] = useState("singapore");
  const [debouncedQuery, setDebouncedQuery] = useState("singapore");
  const [timelineData, setTimelineData] = useState([]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 200);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery) {
      setTimelineData([]);
      return;
    }
  
    const fetchTimelineData = async (searchWord: string) => {
      try {
        const res = await axios.get(
          `https://bia-datathon-2025.onrender.com/api/timeline?word=${searchWord}`
        );
        setTimelineData(res.data);
      } catch (error) {
        console.error("Error fetching timeline data:", error);
        setTimelineData([]);
      }
    };
  
    fetchTimelineData(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <Card className="flex flex-col h-full overflow-y-auto">
      
      <CardHeader className="items-center pb-0">
      <div className="w-full flex justify-between items-start">
        <CardTitle className="pb-3">Timeline</CardTitle>
        <Link href="/timeline" className="text-sm text-black hover:underline flex items-center">
        See More <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
      </CardHeader>
      <CardContent className="flex-1 p-5 overflow-y-auto">
        <Input
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full"
        />

        <Timeline>
          {timelineData.map((item: any) => (
          <TimelineItem
            key={item.id}
            date={item.extracted_date}
            title={item.title}
            description={item.description}
            link={item.link}
          />
          ))}
        </Timeline>

        {timelineData && (
          <div className="mb-4">
          </div>
        )}
      </CardContent>
    </Card>
  );
}
