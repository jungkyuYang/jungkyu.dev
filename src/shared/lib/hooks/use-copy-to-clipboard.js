import { useState, useCallback, useRef, useEffect } from 'react';

export const useCopyToClipboard = (duration = 1500) => {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef(null); // 타이머 관리를 위한 ref

  const copy = useCallback(
    async (text, callback) => {
      if (!text || typeof navigator === 'undefined') return;

      try {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);

        if (callback) callback();

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          setIsCopied(false);
        }, duration);
      } catch (err) {
        console.error('Copy failed:', err);
        setIsCopied(false);
      }
    },
    [duration],
  );

  // 컴포넌트가 사라질 때 타이머 청소 (메모리 누수 방지)
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return { isCopied, copy };
};
