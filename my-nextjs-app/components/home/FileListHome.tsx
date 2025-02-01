// import FileItem from "@/components/filetags/FileItem"
import { UUID } from "crypto";
import FileItem from "./FileItemHome";
import FileItemHome from "./FileItemHome";

interface File {
  id: UUID
  name: string
  type: "pdf" | "link"
  url: string
}

interface FileListProps {
  files: File[]
}

export default function FileListHome({ files }: FileListProps) {
  return (
    <div className="grid gap-4 grid-cols-1">
      {files.map((file) => (
        <FileItemHome key={file.id} file={file} />
      ))}
    </div>
  )
}

