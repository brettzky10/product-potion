"use client";

import { useEffect, useState } from "react";

import PreviewModal from "@/components/domain/store/preview-modal";

const DomainModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return ( 
    <>
      <PreviewModal />
    </>
   );
}
 
export default DomainModalProvider;