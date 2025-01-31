import { UUID } from "crypto"
import { FileText, LinkIcon } from "lucide-react"

interface FileItemProps {
    file: {
        id: UUID
        name: string
        type: "pdf" | "link"
        url: string
    }
}

export default function FileItem({ file }: FileItemProps) {
    console.log('file', file);
    const handleClick = () => {
        if (file.type === "pdf") {
            window.open("https://boffcohbgqzoqxaqkzth.supabase.co/storage/v1/object/public/raw_pdf//" + file.url, "_blank");
        } else {
            window.open(file.url, "_blank"); // Open in a new tab
        }
    }

    return (
        <div
            onClick={handleClick}
            className="p-4 border rounded-md cursor-pointer hover:bg-gray-100 transition-colors flex items-start space-x-3"
        >
            <div className="flex-shrink-0">
                {file.type === "pdf" ? (
                    <FileText className="text-red-500" size={24} />
                ) : (
                    <LinkIcon className="text-blue-500" size={24} />
                )}
            </div>
            <span className="flex-1 break-all">{file.name}</span>
        </div>
    )
}