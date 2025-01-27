"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md p-4 fixed top-0 left-0">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          BIA Datathon
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
          <NavItem href="/knowledgegraph">Knowledge Graph</NavItem>
          <NavItem href="/heatmap">Heatmap</NavItem>
          <NavItem href="/timeline">Timeline</NavItem>
          <NavItem href="/filetags">File Tags</NavItem>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="outline" size="icon">
            <Menu size={20} />
          </Button>
        </div>
      </div>
    </nav>
  );
}

function NavItem({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-gray-700 hover:text-blue-600 transition">
      {children}
    </Link>
  );
}
