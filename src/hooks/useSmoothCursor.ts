import { useEffect, useRef } from "react";

export function useSmoothCursor(lerp = 0.1) {
  const target = useRef({ x: -9999, y: -9999 });
  const current = useRef({ x: -9999, y: -9999 });
  const raf = useRef<number>(0);
  const listeners = useRef<Set<(x: number, y: number) => void>>(new Set());

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * lerp;
      current.current.y += (target.current.y - current.current.y) * lerp;
      listeners.current.forEach((fn) =>
        fn(current.current.x, current.current.y)
      );
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, [lerp]);

  const subscribe = (fn: (x: number, y: number) => void) => {
    listeners.current.add(fn);
    return () => {
      listeners.current.delete(fn);
    };
  };

  return { subscribe, current, target };
}
