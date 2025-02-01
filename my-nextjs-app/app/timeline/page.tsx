// /app/timeline/page.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Timeline, TimelineItem } from "@/components/timeline";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function TimelinePage() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [timelineData, setTimelineData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 200);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  const fetchTimelineData = useCallback(async (searchWord: string) => {
    if (!searchWord) {
      setTimelineData([]);
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:8000/api/timeline?word=${searchWord}`
      );
      setTimelineData(res.data);
    } catch (error) {
      console.error("Error fetching timeline data:", error);
      setTimelineData([]);
    }
  }, []);

  useEffect(() => {
    fetchTimelineData(debouncedQuery);
  }, [debouncedQuery, fetchTimelineData]);

  // Toggle editing mode and refetch timeline data when turning off editing.
  const handleToggleEditing = () => {
    if (isEditing) {
      // When turning editing off, re-fetch the timeline data
      fetchTimelineData(debouncedQuery);
    }
    setIsEditing(!isEditing);
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Timeline</h1>
      <div className="w-full mx-auto">
        <Input
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="w-full px-8 flex flex-row gap-8">
        <div className="mt-8 w-1/2 flex items-center justify-center">
          <Timeline>
            {timelineData.map((item: any) => (
              <TimelineItem
                key={item.id}
                id={item.id}
                date={item.extracted_date}
                title={item.title}
                description={item.description}
                link={item.link}
                isEditing={isEditing}
              />
            ))}
          </Timeline>
        </div>
        <div className="mt-8 w-1/2 flex flex-col items-center">
          <div className="fixed">
            <h2 className="text-lg font-semibold text-center">Search Info</h2>
            <p className="text-sm">
              Search Query: <span className="font-semibold">{query}</span>
            </p>
            <p className="text-sm">
              No. of Articles Returned:{" "}
              <span className="font-semibold">{timelineData.length}</span>
            </p>
            <Button
              onClick={handleToggleEditing}
              variant="secondary"
              className="mt-2 w-full"
            >
              {isEditing ? "Stop Editing" : "Edit Article Dates"}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
