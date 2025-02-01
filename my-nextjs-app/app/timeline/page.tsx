"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Timeline, TimelineItem } from "@/components/timeline";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";

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
    const fetchTimelineData = async (searchWord: string) => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/timeline?word=${searchWord}`
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
    <main className="p-4">
      <div className="w-full max-w-2xl mx-auto">
        <Input
          placeholder="Search timeline..."
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
                icon={<Check />}
              />
            ))}
          </Timeline>
        </div>
      </div>
    </main>
  );
}
