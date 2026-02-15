"use client";

import { useState, useCallback } from "react";

export const useCopy = (timeout = 2000) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = useCallback(async (text) => {
    if (!text) return false;
    
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), timeout);
      return true;
    } catch (err) {
      console.error("Copy failed", err);
      return false;
    }
  }, [timeout]);

  return { isCopied, copy };
};