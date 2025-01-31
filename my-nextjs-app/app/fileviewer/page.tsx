"use client"

import { useState } from "react"
import FileList from "@/components/fileviewer/FileList";
import SearchFunction from "@/components/searchFunction";
import axios from 'axios';
import { UUID } from "crypto";

type File = {
  id: UUID;
  name: string;
  type: "pdf" | "link";
  url: string;
}

export default function Fileviewer() {
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
  return (
      <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">File Viewer</h1>
      <SearchFunction onSearch={handleSearch} />
      <FileList files={files} />
    </main>
 
  );
}