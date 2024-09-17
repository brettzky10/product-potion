"use client";

import NextImage from "next/image";

const Gallery = ({
  image
}:{image: string}) => {
  return ( 
    <div className="aspect-square relative h-full w-full sm:rounded-lg overflow-hidden">
              <NextImage
                fill
                src={image}
                alt="Image"
                className="object-cover object-center"
              />
            </div>
  );
}
 
export default Gallery;