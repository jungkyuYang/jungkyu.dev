import { useState } from 'react';

export const useCopyToClipboard = (duration = 1500) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async (text, callback) => {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);

      // 복사 후 추가 행동(메일 앱 실행 등)이 필요할 때 실행
      if (callback) callback();

      // 지정된 시간 후 상태 복구
      setTimeout(() => setIsCopied(false), duration);
    } catch (err) {
      console.error('Copy failed:', err);
      setIsCopied(false);
    }
  };

  return { isCopied, copy };
};
