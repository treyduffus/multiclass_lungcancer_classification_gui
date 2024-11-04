"use client"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

import Dropzone from 'react-dropzone';


export default function Filedrop() {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <Label htmlFor="file" className="text-sm font-medium" />
        <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
        {({getRootProps, getInputProps}) => (
        <div {...getRootProps()} className="dropzone border-2 border-dashed border-gray-200 rounded-lg flex flex-col gap-1 p-6 items-center">
          <input {...getInputProps()} />
          <FileIcon className="w-12 h-12" />
          <span className="text-sm font-medium text-gray-500">Drag and drop a file or click to browse</span>
          <span className="text-xs text-gray-500">PDF, image, json, or csv</span>
        </div>
        )}
        </Dropzone>
        <div className="space-y-2 text-sm">
          <Label htmlFor="file" className="text-sm font-medium">
            File
          </Label>
          <Input id="file" type="file" placeholder="File" accept="image/*" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button size="lg" className="w-full">
          Upload <Upload />
        </Button>
      </CardFooter>
    </Card>
  )
}

function FileIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  )
}