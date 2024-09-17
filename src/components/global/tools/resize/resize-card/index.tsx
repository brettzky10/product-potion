"use client"

import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { ImageCropper } from "@/components/global/tools/resize/resize-card/image-cropper"
import { FileWithPath, useDropzone } from "react-dropzone"
import SvgText from "@/components/global/tools/resize/resize-card/svg-text"
import Image from "next/image"
import { saveAs } from 'file-saver';

export type FileWithPreview = FileWithPath & {
  preview: string
  
}

const accept = {
  "image/*": [],
}

export default function ResizeComponent() {
  const [selectedFile, setSelectedFile] =
    React.useState<FileWithPreview | null>(null)
  const [isDialogOpen, setDialogOpen] = React.useState(false)

  const onDrop = React.useCallback(
    (acceptedFiles: FileWithPath[]) => {
      const file = acceptedFiles[0]
      if (!file) {
        alert("Selected image is too large!")
        return
      }

      const fileWithPreview = Object.assign(file, {
        preview: URL.createObjectURL(file),
      })

      setSelectedFile(fileWithPreview)
      setDialogOpen(true)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
  })



  return (
    <div className="relative h-[300px] min-h-[300px] flex items-center text-center justify-center ">
      {selectedFile ? (
        <ImageCropper
          dialogOpen={isDialogOpen}
          setDialogOpen={setDialogOpen}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          
        />

        
      ) : (
        <div>
          
        <Avatar
          {...getRootProps()}
          className="size-36 cursor-pointer ring-offset-2 ring-2 ring-slate-200 mx-10"
        >
          <input {...getInputProps()} />
          <AvatarImage src="/icons/placeholder.svg" alt="placeholder" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        {/* <div className=" ">
        <SvgText />
      </div> */}
        </div>
        
      )}

      
    </div>
  )
}