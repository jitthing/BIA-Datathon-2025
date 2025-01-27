import { Chart1 } from "@/components/chart1";
import { Chart2 } from "@/components/chart2";
import { Chart3 } from "@/components/chart3";
import Navbar from "@/components/navbar";
import Image from "next/image";

export default function Knowledgegraph() {
  return (
    <main className="flex flex-col gap-8 items-center sm:items-start px-6 pb-10">
      <h1 className="text-2xl font-bold text-gray-800">Knowledge Graph</h1>

      <div className="grid gap-6 md:grid-cols-3 w-full">
        {/* Row 1: Three small charts */}
        <Chart1/>
        <Chart3/>
        <Chart2/>
        <Chart2/>
        {/* <Chart3/> */}

        {/* Row 2: Large chart spanning two columns */}
        <div className="md:col-span-2 min-h-[300px] rounded-xl">
          <Chart3 />
        </div>
      </div>
    </main>
 
  );
}