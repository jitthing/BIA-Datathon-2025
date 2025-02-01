"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Timeline, TimelineItem } from "@/components/timeline";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export default function TlHome() {
  const [query, setQuery] = useState("Singapore");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [timelineData, setTimelineData] = useState<any[]>([]);

  // Debounce the search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 200);
    return () => {
      clearTimeout(handler);
    };
  }, [query]);
  

  // Fetch timeline data when the debounced query changes.
  useEffect(() => {
    if (!debouncedQuery) {
      setTimelineData([]);
      return;
    }

    const fetchTimelineData = async () => {
      try {
        const res = await axios.get(
          BACKEND_URL + `/api/timeline?word=${debouncedQuery}`
        );
        setTimelineData(res.data);
      } catch (error) {
        console.error("Error fetching timeline data:", error);
        setTimelineData([]);
      }
    };

    fetchTimelineData();
  }, [debouncedQuery]);

  const previewData = timelineData.slice(0, 3);

  return (
    <Card className="h-full flex flex-col overflow-y-auto">
      <CardHeader className="items-center pb-0">
        <div className="w-full flex justify-between items-start">
          <CardTitle className="pb-3">Timeline</CardTitle>
          <Link
            href="/timeline"
            className="text-sm text-black hover:underline flex items-center"
          >
            See More <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-5 overflow-y-auto">
        <div className="mb-4">
          <Input
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Timeline>
          {previewData.length > 0 ? (
            previewData.map((item: any) => (
              <TimelineItem
                key={item.id}
                id={item.id}
                date={item.extracted_date}
                title={item.title}
                description={item.description}
                link={item.link}
              />
            ))
          ) : (
            <div className="text-center text-sm text-muted-foreground">
              No timeline items to display.
            </div>
          )}
        </Timeline>
        <div className="flex items-center justify-center">
        <Link
            href="/timeline"
            className="text-center text-sm text-muted-foreground hover:text-foreground"
          >
            See More
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
