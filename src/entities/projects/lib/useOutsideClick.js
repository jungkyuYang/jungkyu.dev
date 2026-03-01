import { useEffect, useRef } from 'react';

export function useOutsideClick(ref, handler, enabled = true) {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!enabled) return;

    const listener = (event) => {
      // ref가 없거나 클릭된 타겟이 ref 내부에 있다면 무시
      if (!ref.current || ref.current.contains(event.target)) return;

      handlerRef.current(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener, { passive: true });

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener, { passive: true });
    };
  }, [ref, enabled]); // 이제 handler가 바뀌어도 리스너가 재등록되지 않음
}
