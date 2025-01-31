import { Chart1 } from "@/components/chart1";
import { Chart2 } from "@/components/chart2";
import KnowledgeGraphChart from "@/components/knowledgegraph/knowledgegraph";
import Navbar from "@/components/navbar";


export default function Knowledgegraph() {
  return (
    <main className="flex flex-col gap-8 items-center sm:items-start px-6 pb-10">

      <div className="grid gap-6 md:grid-cols-3 w-full">
        {/* Row 1: Three small charts */}
        <KnowledgeGraphChart />
        <Chart1/>
        <Chart1/>
        {/* <Chart3/> */}

        {/* Row 2: Large chart spanning two columns */}
        <div className="md:col-span-2 min-h-[300px] rounded-xl">
          <Chart1 />
        </div>
      </div>
    </main>
 
  );
}