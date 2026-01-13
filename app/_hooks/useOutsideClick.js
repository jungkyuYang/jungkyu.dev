import { useEffect } from 'react';

// handler는 useCallback 등으로 메모이제이션해서 전달하는 것이 불필요한 리스너 재등록을 막을 수 있습니다.
export default function useOutsideClick(ref, handler, enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener, { passive: true });
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener, { passive: true });
    };
  }, [ref, handler, enabled]);
}
