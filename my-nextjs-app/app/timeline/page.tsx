"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Timeline, TimelineItem } from "@/components/timeline";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function TimelinePage() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
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
                date={item.extracted_date}
                title={item.title}
                description={item.description}
                link={item.link}
              />
            ))}
          </Timeline>
        </div>
        <div className="mt-8 w-1/2 flex flex-col items-center">
          {timelineData && (
            <div>
              <h2 className="text-lg font-semibold text-center">Search Info</h2>
              <p className="text-sm">Search Query: <span className="font-semibold">{query}</span></p>
              <p className="text-sm">No. of Articles Returned: <span className="font-semibold">{timelineData.length}</span></p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
