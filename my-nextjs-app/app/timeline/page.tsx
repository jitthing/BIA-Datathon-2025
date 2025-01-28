import { Timeline, TimelineItem } from "@/components/timeline";
import { Check } from "lucide-react";

export default function TimelinePage() {
  return (
    <main className="flex flex-col gap-8 items-center sm:items-start px-6 pb-10">
      <h1 className="text-2xl font-bold text-gray-800">Timeline</h1>

      <div className="grid gap-6 md:grid-cols-3 w-full">
        <div className="md:col-span-3 min-h-[300px] rounded-xl">
          <Timeline>
            <TimelineItem
              date="2024-01-01"
              title="Feature Released"
              description="New timeline component is now available"
              icon={<Check />}
              status="completed"
            />
            <TimelineItem
              date="2024-01-02"
              title="In Progress"
              description="Working on documentation"
              status="in-progress"
            />
            <TimelineItem
              date="2024-01-03"
              title="Upcoming"
              description="Planning future updates"
              status="pending"
            />
          </Timeline>{" "}
        </div>
      </div>
    </main>
  );
}
