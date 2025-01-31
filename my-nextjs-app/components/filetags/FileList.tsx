// import FileItem from "@/components/filetags/FileItem"
import { UUID } from "crypto";
import FileItem from "./FileItem";

interface File {
  id: UUID
  name: string
  type: "pdf" | "link"
  url: string
}

interface FileListProps {
  files: File[]
}

export default function FileList({ files }: FileListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {files.map((file) => (
        <FileItem key={file.id} file={file} />
      ))}
    </div>
  )
}

