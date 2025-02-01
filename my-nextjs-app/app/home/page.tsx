import Navbar from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import KgHome from "@/components/home/kgHome";
import TlHome from "@/components/home/tlHome";
import FvHome from "@/components/home/fvHome";
import HmHome from "@/components/home/hmHome";

export default function HomePage() {
    return (
      <main className="flex flex-col gap-8 items-center sm:items-start px-6 pb-10">
        <div className="grid gap-6 md:grid-cols-3 w-full">
          {/* Row 1: Three small charts */}
          <div className="h-[500px] flex flex-col overflow-hidden">
            <div className="flex-1 p-4">
              <KgHome />
            </div>
          </div>
          <div className="h-[500px] flex flex-col overflow-hidden">
            <div className="flex-1 p-4">
              <TlHome />
            </div>
          </div>
          <div className="h-[500px] flex flex-col pb-2">
            <div className="flex-1 overflow-y-auto p-4">
              <FvHome />
            </div>
          </div>
  
          {/* Row 2: Large chart spanning two columns */}
          <div className="md:col-span-3 min-h-[300px] rounded-xl">
            <div className="flex-1 overflow-y-auto p-4">
              <HmHome />
            </div>
          </div>
        </div>
      </main>
    );
  }