import { Chart1 } from "@/components/chart1";
import { Chart2 } from "@/components/chart2";
import { Chart3 } from "@/components/chart3";
import { Chart4 } from "@/components/chart4";
import Navbar from "@/components/navbar";
import Image from "next/image";

export default function Timeline() {
  return (
    <main className="flex flex-col gap-8 items-center sm:items-start px-6 pb-10">
      <h1 className="text-2xl font-bold text-gray-800">Timeline</h1>

      

      <div className="grid gap-6 md:grid-cols-3 w-full">
        {/* Row 2: Large chart spanning two columns */}
        <div className="md:col-span-3 min-h-[300px] rounded-xl">
          <Chart4/>
        </div>

        {/* Row 1: Three small charts */}
        <Chart1/>
        <Chart3/>
        <Chart2/>
        


      </div>
    </main>
 
  );
}