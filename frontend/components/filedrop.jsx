"use client"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

import Dropzone from 'react-dropzone';
import EditParams from "@/components/editparameters"

// TODO: Add drawer for sliders - https://ui.shadcn.com/docs/components/drawer
// TODO: Add toast to confirm file upload - https://ui.shadcn.com/docs/components/toast

export default function Filedrop() {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <Label htmlFor="file" className="text-sm font-medium" />
        <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
        {({getRootProps, getInputProps}) => (
        <div {...getRootProps()} className="dropzone cursor-pointer border-2 border-dashed border-gray-200 rounded-lg flex flex-col gap-1 p-6 items-center">
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
      <CardFooter className="flex justify-center space-x-4">
        <EditParams />
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
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e8eaed"
        >
          <path d="M200-120q-33 0-56.5-23.5T120-200v-400q0-33 23.5-56.5T200-680h160v80H200v400h560v-400H600v-80h160q33 0 56.5 23.5T840-600v400q0 33-23.5 56.5T760-120H200Zm280-200L320-480l56-56 64 63v-487h80v487l64-63 56 56-160 160Z"/>
    </svg>
  )
}