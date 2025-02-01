"use client";

import React from "react";
import dynamic from "next/dynamic";
import RelationshipHeatmap from "@/components/heatmap/heatmap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";  // Assuming you have a UI Input component
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react"
import FileList from "@/components/fileviewer/FileList";
import SearchFunction from "@/components/searchFunction";
import axios from 'axios';
import { UUID } from "crypto";
import FileListHome from "./FileListHome";

type File = {
  id: UUID;
  name: string;
  type: "pdf" | "link";
  url: string;
}



export default function FvHome() {
    const [files, setFiles] = useState<File[]>([])

    const fetchData = async (value:string) => {
      const response = await axios.get("https://bia-datathon-2025.onrender.com/api/dataset", {
        params: { search: value }
      });
      // Transform the data to match File type
      const transformedData: File[] = response.data.map((item: any) => ({
        id: item.id,
        name: (item.Source || 'Untitled').length > 50 
        ? `${(item.Source || 'Untitled').substring(0, 50)}...` 
        : (item.Source || 'Untitled'),
        type: item.Source.endsWith('.pdf') ? 'pdf' : 'link',
        url: item.Source || '#'
      }));
      console.log('transformed data', transformedData);
      return { data: transformedData };
    }
  
    const handleSearch = async (searchTerm: string) => {
      const response = await fetchData(searchTerm);
      const searchResults = response?.data || [];
      console.log('searchResults', searchResults);
      
      // Deduplicate based on 'name'
      const uniqueResults = Array.from(
        new Map(searchResults.map(item => [item.name, item])).values()
      );
    
      setFiles(uniqueResults);
      console.log('filtered files', uniqueResults);
    };
  
    // Add useEffect for initial search
    useEffect(() => {
      handleSearch('singapore'); // Perform empty search on component mount
    }, []);

  return (
    <Card className="flex flex-col h-full overflow-y-auto">
      <CardHeader className="items-center pb-0">
        <div className="w-full flex justify-between items-start">
          <CardTitle className="pb-3">File Viewer</CardTitle>
          <Link href="/fileviewer" className="text-sm text-black hover:underline flex items-center">
            See More <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-5 overflow-y-auto">
        {/* <main className="container mx-auto p-4"> */}

            <SearchFunction onSearch={handleSearch} />
            <FileListHome files={files} />
        {/* </main> */}
      </CardContent>
    </Card>
  );
}
