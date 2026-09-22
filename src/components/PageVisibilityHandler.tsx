// src/components/PageVisibilityHandler.tsx
"use client";

import { useEffect } from "react";

export default function PageVisibilityHandler() {
  useEffect(() => {
    const originalTitle = document.title;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = "👀 Geri dön! Verileriniz güvende | PrivaTools";
      } else {
        document.title = originalTitle;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.title = originalTitle;
    };
  }, []);

  return null;
}