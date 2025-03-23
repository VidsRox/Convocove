"use client";

import { FileIcon, X } from "lucide-react";
import Image from "next/image";

import { UploadDropzone } from "@/lib/uploadthing";
import { useState } from "react";

interface FileUploadProps {
    onChange: (url?: string) => void;
    value: string;
    endpoint: "messageFile" | "serverImage"
}

export const FileUpload = ({
    onChange,
    value,
    endpoint
}: FileUploadProps) => {
    
    const [uploadName, setUploadName] = useState<string>('');
    
    // Get file type from both sources to be more reliable
    const fileType = value ? value.split(".").pop()?.toLowerCase() : null;
    const isPdf = fileType === "pdf" || uploadName?.toLowerCase().endsWith(".pdf");

    // Display image preview for non-PDF files
    if (value && !isPdf) {
        return (
            <div className="relative h-20 w-20">
                <Image 
                fill
                src={value}
                alt="Upload"
                className="rounded-md object-cover"
                />
                <button
                onClick={() => onChange("")}
                className="bg-rose-500 text-white p-1 
                rounded-full absolute top-0 right-0 shadow-sm"
                type="button"
                >
                    <X className="h-4 w-4"/>
                </button>
            </div>
        )
    }

    // Display PDF icon and link
    if (value && isPdf) {
        return (
            <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
                <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400"/>
                <a 
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
                >
                    {uploadName || "PDF Document"}
                </a>
                <button
                    type="button"
                    onClick={() => {
                    onChange('');
                    setUploadName('');
                    }}
                    className='bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm'
                >
                    <X className='h-4 w-4'/>
                </button>
            </div>
        )
    }

    // Display upload dropzone if no file uploaded yet
    return (
        <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
            if (res && res[0]) {
                onChange(res?.[0]?.url);
                setUploadName(res?.[0]?.name);
                console.log("Upload complete:", res[0].name, res[0].url);
            }
        }}
        onUploadError={(error: Error) => {
            console.error("Upload error:", error);
        }}
        className="cursor-pointer hover:bg-gray-100"
        />
    )
}