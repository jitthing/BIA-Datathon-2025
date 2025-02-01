import { Chart1 } from "@/components/chart1";
import { Chart2 } from "@/components/chart2";
import { Chart3 } from "@/components/chart3";
import Navbar from "@/components/navbar";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/home");
}

