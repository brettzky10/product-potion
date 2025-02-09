"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
//import { CldUploadButton } from "next-cloudinary";

import { Button } from "@/components/ui/button";
import { ImageIcon, X } from "lucide-react";
import { Input } from "./input";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/supabase-client";

interface ImageUploadProps {
  value: string;
  onChange: (src: string) => void;
  disabled?: boolean;
}

export const ImageUpload = ({
  value,
  onChange,
  disabled,
}: ImageUploadProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null)

  
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return false;
  }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabase = createClient();

    const randomNameId = `character-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  
  const handleImageClick = () => {
    fileInputRef.current?.click()
  }
  
  
  const handleImageCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setCapturedImage(imageUrl)
    }
  }


  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const file = event.target.files?.[0];
      if (file) {
        const { data, error } = await supabase.storage
          .from("store-files")
          .upload(`/${randomNameId}`, file, { //randomNameId
            cacheControl: "3600",
            upsert: false, //false
          });
          setCapturedImage(`${supabaseUrl}/storage/v1/object/public/store-files/${data?.path}`)
        if (error) {
            toast.error("Error occurred while uploading file")
          throw error;
        }
        
        //console.log(productInfo)
        
      }
    } catch (error) {
        toast.error("Error occurred while uploading file")
      console.error("An error occurred while uploading the file:", error);
    }
    return value = capturedImage!

    
  };




  return (
    <div className="space-y-4 w-full flex flex-col justify-center items-center">
      <div 
            className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer"
            onChange={handleFileChange}
            onClick={handleImageClick}
          >
            <div className="space-y-1 text-center">
              {capturedImage ? (
                <Image
                  src={capturedImage}
                  alt="Captured image"
                  width={100}
                  height={100}
                  className="mx-auto object-cover rounded-md"
                />
              ) : (
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="image-capture"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
                >
                  <span>{capturedImage ? 'Change photo' : 'Capture photo'}</span>
                  <Input
                    id="imagePath" name="imagePath" 
                    required
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="sr-only"
                    onChange={handleFileChange}//{handleImageCapture}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG up to 3MB</p>
            </div>
          </div>
      
    </div>
  );
};
